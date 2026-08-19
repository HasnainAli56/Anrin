/**
 * ANRIN Search Autocomplete
 * Vanilla JavaScript implementation - no dependencies
 */

(function() {
    'use strict';

    // Configuration
    var CONFIG = {
        minChars: 2,
        debounceDelay: 300,
        apiEndpoint: '/suche/api/autocomplete/'
    };

    // DOM Elements
    var searchInput = null;
    var searchForm = null;
    var dropdown = null;
    var currentFocus = -1;
    var debounceTimer = null;
    var currentRequest = null;

    /**
     * Initialize autocomplete
     */
    function init() {
        searchInput = document.getElementById('navbar-search-input');
        if (!searchInput) return;

        searchForm = searchInput.closest('form');
        if (!searchForm) return;

        createDropdown();
        attachEventListeners();
    }

    /**
     * Create dropdown element
     */
    function createDropdown() {
        dropdown = document.createElement('div');
        dropdown.className = 'search-autocomplete-dropdown';
        dropdown.setAttribute('role', 'listbox');
        dropdown.setAttribute('id', 'search-autocomplete-dropdown');
        searchForm.appendChild(dropdown);
    }

    /**
     * Attach event listeners
     */
    function attachEventListeners() {
        // Input events
        searchInput.addEventListener('input', handleInput);
        searchInput.addEventListener('focus', handleFocus);
        searchInput.addEventListener('keydown', handleKeydown);

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target)) {
                closeDropdown();
            }
        });

        // Prevent form submission if dropdown is open and item is focused
        searchForm.addEventListener('submit', handleFormSubmit);
    }

    /**
     * Handle input changes
     */
    function handleInput(e) {
        var query = e.target.value.trim();

        // Clear previous timer
        clearTimeout(debounceTimer);

        // Cancel previous request
        if (currentRequest) {
            currentRequest.abort();
        }

        // Reset focus
        currentFocus = -1;

        if (query.length < CONFIG.minChars) {
            closeDropdown();
            return;
        }

        // Show loading state
        showLoading();

        // Debounce API call
        debounceTimer = setTimeout(function() {
            fetchResults(query);
        }, CONFIG.debounceDelay);
    }

    /**
     * Handle input focus
     */
    function handleFocus() {
        var query = searchInput.value.trim();
        if (query.length >= CONFIG.minChars) {
            // Reopen dropdown if there's existing content
            if (dropdown.innerHTML && !dropdown.classList.contains('active')) {
                openDropdown();
            }
        }
    }

    /**
     * Handle keyboard navigation
     */
    function handleKeydown(e) {
        var items = dropdown.querySelectorAll('.search-autocomplete-dropdown__item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocus++;
            if (currentFocus >= items.length) currentFocus = 0;
            setActive(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocus--;
            if (currentFocus < 0) currentFocus = items.length - 1;
            setActive(items);
        } else if (e.key === 'Enter') {
            if (currentFocus > -1 && items[currentFocus]) {
                e.preventDefault();
                items[currentFocus].click();
            }
        } else if (e.key === 'Escape') {
            closeDropdown();
            searchInput.blur();
        }
    }

    /**
     * Set active item for keyboard navigation
     */
    function setActive(items) {
        removeActive(items);
        if (currentFocus >= 0 && currentFocus < items.length) {
            items[currentFocus].classList.add('keyboard-focus');
            items[currentFocus].scrollIntoView({ block: 'nearest' });
        }
    }

    /**
     * Remove active class from all items
     */
    function removeActive(items) {
        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('keyboard-focus');
        }
    }

    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        var items = dropdown.querySelectorAll('.search-autocomplete-dropdown__item');
        if (currentFocus > -1 && items[currentFocus]) {
            e.preventDefault();
            items[currentFocus].click();
        }
    }

    /**
     * Fetch results from API
     */
    function fetchResults(query) {
        var controller = new AbortController();
        currentRequest = controller;

        var url = CONFIG.apiEndpoint + '?q=' + encodeURIComponent(query);

        fetch(url, { signal: controller.signal })
            .then(function(response) {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(function(data) {
                renderResults(data);
            })
            .catch(function(error) {
                if (error.name !== 'AbortError') {
                    console.error('Search error:', error);
                    showError();
                }
            })
            .finally(function() {
                currentRequest = null;
            });
    }

    /**
     * Render results in dropdown
     */
    function renderResults(data) {
        dropdown.innerHTML = '';

        var hasResults = data.categories.length > 0 ||
                          data.rost_products.length > 0 ||
                          data.gutter_bodies.length > 0 ||
                          data.sport_products.length > 0;

        if (!hasResults) {
            showEmpty();
            return;
        }

        // Render categories
        if (data.categories.length > 0) {
            renderSection('Anwendungsgebiete', data.categories, 'category');
        }

        // Render gutter bodies FIRST (before rost products)
        if (data.gutter_bodies.length > 0) {
            renderSection('Rinnenkörper', data.gutter_bodies, 'product');

            // Add "See all" link if there are more results
            if (data.gutter_bodies_total && data.gutter_bodies_total > 5) {
                renderSeeAllLink(data.gutter_bodies_see_all_url, data.gutter_bodies_total);
            }
        }

        // Render rost products (after gutter bodies)
        if (data.rost_products.length > 0) {
            renderSection('Abdeckroste', data.rost_products, 'product');
        }

        // Render sport products
        if (data.sport_products.length > 0) {
            renderSection('Sport-Produkte', data.sport_products, 'product');
        }

        openDropdown();
    }

    /**
     * Render a section of results
     */
    function renderSection(title, items, type) {
        var section = document.createElement('div');
        section.className = 'search-autocomplete-dropdown__section';

        var sectionTitle = document.createElement('div');
        sectionTitle.className = 'search-autocomplete-dropdown__section-title';
        sectionTitle.textContent = title;
        section.appendChild(sectionTitle);

        for (var i = 0; i < items.length; i++) {
            var itemEl = createItemElement(items[i], type);
            section.appendChild(itemEl);
        }

        dropdown.appendChild(section);
    }

    /**
     * Render "See all" link
     */
    function renderSeeAllLink(url, total) {
        var link = document.createElement('a');
        link.href = url;
        link.className = 'search-autocomplete-dropdown__see-all';
        link.textContent = 'Alle ' + total + ' Ergebnisse anzeigen →';
        dropdown.appendChild(link);
    }

    /**
     * Create item element
     */
    function createItemElement(item, type) {
        var link = document.createElement('a');
        link.href = item.url;
        link.className = 'search-autocomplete-dropdown__item';
        link.setAttribute('role', 'option');

        // Add thumbnail if available
        if (item.thumbnail && type === 'product') {
            var img = document.createElement('img');
            img.src = item.thumbnail;
            img.alt = item.name;
            img.className = 'search-autocomplete-dropdown__thumbnail';
            link.appendChild(img);
        }

        // Add content
        var content = document.createElement('div');
        content.className = 'search-autocomplete-dropdown__content';

        var name = document.createElement('p');
        name.className = 'search-autocomplete-dropdown__name';
        name.textContent = item.name;
        content.appendChild(name);

        if (item.category_name || item.nominal_width) {
            var category = document.createElement('p');
            category.className = 'search-autocomplete-dropdown__category';
            category.textContent = item.category_name || (item.name + '-' + item.nominal_width);
            content.appendChild(category);
        }

        link.appendChild(content);

        // Add arrow icon
        var icon = document.createElement('span');
        icon.className = 'search-autocomplete-dropdown__icon';
        icon.innerHTML = '→';
        link.appendChild(icon);

        return link;
    }

    /**
     * Show loading state
     */
    function showLoading() {
        dropdown.innerHTML = '<div class="search-autocomplete-dropdown__loading">Suche läuft...</div>';
        openDropdown();
    }

    /**
     * Show empty state
     */
    function showEmpty() {
        dropdown.innerHTML = '<div class="search-autocomplete-dropdown__empty">Keine Ergebnisse gefunden</div>';
        openDropdown();
    }

    /**
     * Show error state
     */
    function showError() {
        dropdown.innerHTML = '<div class="search-autocomplete-dropdown__empty">Fehler bei der Suche</div>';
        openDropdown();
    }

    /**
     * Open dropdown
     */
    function openDropdown() {
        dropdown.classList.add('active');
        searchInput.setAttribute('aria-expanded', 'true');
    }

    /**
     * Close dropdown
     */
    function closeDropdown() {
        dropdown.classList.remove('active');
        searchInput.setAttribute('aria-expanded', 'false');
        currentFocus = -1;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
