$(document).ready(function () { 

    // variant
    $('.size').click(function(){
        var current_size = $(this).data('current');
        if (current_size == '50') {
            $(this).data('current','100')
            $(this).empty().text('50 cm')
            $('.icon-360').addClass('d-none')
            $('.icon-360-variant').removeClass('d-none')
            $('.product-image-variant').removeClass('d-none');
            $('.product-image-normal').addClass('d-none');
        } else {
            $(this).data('current','50')
            $(this).empty().text('100 cm')
            $('.icon-360').removeClass('d-none')
            $('.icon-360-variant').addClass('d-none')
            $('.product-image-variant').addClass('d-none');
            $('.product-image-normal').removeClass('d-none');
        }
        
    });

    // products detail
    $('.filter-option').click(function(){
        if ($(this).attr('aria-expanded') == 'false') {
            $('.current-filter').addClass('opacity-0 h-0');
            $('.close-filter').removeClass('d-none');
            $('.remove-all-filter').removeClass('d-none');
            setTimeout(function(){ 
                if($(window).height() <= $('.product-filter').height()) {
                    $('.product-filter').addClass('scrolling-filter');
                }
            }, 1000);
        } else {
            $('.current-filter').removeClass('opacity-0 h-0');
            $('.close-filter').addClass('d-none');
            $('.product-filter').removeClass('scrolling-filter');
            $('.remove-all-filter').addClass('d-none');
        }
    });

    // product filter

    $('.close-filter').click(function(){
        $('.collapse').collapse('hide');
        $(this).addClass('d-none');
        $('.current-filter').removeClass('opacity-0 h-0');
        $('.product-filter').removeClass('scrolling-filter');
    });

    function reloadFilter(clicked, active) {

        $('.perfect-fit-product').each(function( index ) {
            element_loading_classes = $(this).data('loading-class').toString().replace(' ','');
            element_loading_classes = element_loading_classes.split(',');

            element_nominal_width = $(this).data('nominal-width').toString().replace(' ','');
            element_nominal_width = element_nominal_width.split(',');
            element_material = $(this).data('material').toString().replace(' ','');
            element_material = element_material.split(',');
    
            // for each loading class of element

            inside_loading_class = [];
            inside_nominal_width = [];
            inside_material = [];
    
            // check every value of element loading class is in filter
    
            if (current_filter.length > 0) {
                element_loading_classes.forEach(function(item) {
                    if (current_filter.includes(item)) {
                        inside_loading_class.push(true);
                    } else {
                        inside_loading_class.push(false);
                    }
                });
            } else {
                inside_loading_class.push(true);
            }

            // check every value of element nominal width is in filter
    
            if (current_nominal_width_filter.length > 0) {
                element_nominal_width.forEach(function(item) {
                    if (current_nominal_width_filter.includes(item)) {
                        inside_nominal_width.push(true);
                    } else {
                        inside_nominal_width.push(false);
                    }
                });
            } else {
                inside_nominal_width.push(true);
            }

              // check every value of element material is in filter
              if (current_detail_material_filter.length > 0) {
                element_material.forEach(function(item) {
                    if (current_detail_material_filter.includes('steel')) {
                        if (current_detail_material_filter.includes(item) || item == 'stainless_steel' || item == 'galvanized') {
                            inside_material.push(true);
                        } else {
                            inside_material.push(false);
                        }
                    } else {
                        if (current_detail_material_filter.includes(item)) {
                            inside_material.push(true);
                        } else {
                            inside_material.push(false);
                        }
                    }
                    
                });
            } else {
                inside_material.push(true);
            }

            if ($('.perfect-fit-product').length == $('.perfect-fit-product.d-none').length  && active != false && active != 'start') {
    
                $('.popup-rost-design').removeClass('d-none');
                $('.popup-rost-design .buttons button').removeClass('start').removeClass('loadcap').removeClass('nominalwidth').removeClass('material');
                $('.popup-rost-design .buttons button').addClass(clicked);
                $('.popup-rost-design .text').addClass('d-none');
                if (clicked == 'loadcap') {
                    $('.popup-rost-design .text.loadcap').removeClass('d-none');
                } else if (clicked == 'nominalwidth') {
                    $('.popup-rost-design .text.nominalwidth').removeClass('d-none');
                } else if (clicked == 'material') {
                    $('.popup-rost-design .text.material').removeClass('d-none');
                } else if (clicked == 'start') {
                    $('.popup-rost-design .text.start').removeClass('d-none');
                }
            
            }

            if (inside_nominal_width.includes(true) && inside_loading_class.includes(true) && inside_material.includes(true)) {
                $(this).removeClass('d-none');
            } else {
                if(clicked == 'loadcap') {
                    localStorage.setItem('detail_nominalwidth_filter', JSON.stringify([]));
                    localStorage.setItem('detail_material_filter', JSON.stringify([]));
    
                    $('.current-nominalwidth-filter').removeClass('d-inline-block').addClass('d-none');
                    $('.current-material-filter').removeClass('d-inline-block').addClass('d-none');
    
                    $('.nominalwidth-filter').removeClass('filter-active').addClass('filter-not-active');
                    $('.material-filter').removeClass('filter-active').addClass('filter-not-active');
    
                    if (inside_loading_class.includes(true)) {
                        $(this).removeClass('d-none');
                    } else {
                        $(this).addClass('d-none');
                    }
                } else if(clicked == 'nominalwidth') {
                    localStorage.setItem('detail_loadcap_filter', JSON.stringify([]));
                    localStorage.setItem('detail_material_filter', JSON.stringify([]));
    
                    $('.current-loadingclass-filter').removeClass('d-inline-block').addClass('d-none');
                    $('.current-material-filter').removeClass('d-inline-block').addClass('d-none');
    
                    $('.loadcap-filter').removeClass('filter-active').addClass('filter-not-active');
                    $('.material-filter').removeClass('filter-active').addClass('filter-not-active');

                    if (inside_nominal_width.includes(true)) {
                        $(this).removeClass('d-none');
                    } else {
                        $(this).addClass('d-none');
                    }
                } else if(clicked == 'material') {
                    localStorage.setItem('detail_loadcap_filter', JSON.stringify([]));
                    localStorage.setItem('detail_nominalwidth_filter', JSON.stringify([]));
    
                    $('.current-loadingclass-filter').removeClass('d-inline-block').addClass('d-none');
                    $('.current-nominalwidth-filter').removeClass('d-inline-block').addClass('d-none');
    
                    $('.loadcap-filter').removeClass('filter-active').addClass('filter-not-active');
                    $('.nominalwidth-filter').removeClass('filter-active').addClass('filter-not-active');
                    
                    if (inside_material.includes(true)) {
                        $(this).removeClass('d-none');
                    } else {
                        $(this).addClass('d-none');
                    }
                } else {
                    $(this).addClass('d-none');
                }
            }

            if ($('.perfect-fit-product').length == $('.perfect-fit-product.d-none').length && active != false && active != 'start') {
                $('.popup-rost-design').removeClass('d-none');
                $('.popup-rost-design .buttons button').removeClass('start').removeClass('loadcap').removeClass('nominalwidth').removeClass('material');
                $('.popup-rost-design .buttons button').addClass(clicked);
                $('.popup-rost-design .text').addClass('d-none');

                if (clicked == 'loadcap') {
                    $('.popup-rost-design .text.loadcap').removeClass('d-none');
                } else if (clicked == 'nominalwidth') {
                    $('.popup-rost-design .text.nominalwidth').removeClass('d-none');
                } else if (clicked == 'material') {
                    $('.popup-rost-design .text.material').removeClass('d-none');
                } else if (clicked == 'start') {
                    $('.popup-rost-design .text.start').removeClass('d-none');
                }
            
            }
        });

    }

    // setting current filter

    var inside_loading_class = [];
    var inside_nominal_width = [];
    var inside_material = [];

    if (localStorage.getItem('detail_loadcap_filter') === null) {
        var current_filter = [];
        localStorage.setItem('detail_loadcap_filter', JSON.stringify(current_filter))
    } else {
        current_filter = JSON.parse(localStorage.getItem('detail_loadcap_filter'));
        $('.current-loadingclass-filter').addClass('d-none').removeClass('d-inline-block');
        current_filter.forEach(function(item) {
            $('.current-loadingclass-' + item).addClass('d-inline-block').removeClass('d-none');
        });
    }

    $('.loadcap-filter').each(function( index ) {
        if(current_filter.includes($(this).data('value'))) {
            $(this).addClass('filter-active').removeClass('filter-not-active');
        } else {
            $(this).removeClass('filter-active').addClass('filter-not-active');
        }
    });

    if (localStorage.getItem('detail_nominalwidth_filter') === null) {
        var current_nominal_width_filter = [];
        localStorage.setItem('detail_nominalwidth_filter', JSON.stringify(current_nominal_width_filter))
    } else {
        current_nominal_width_filter = JSON.parse(localStorage.getItem('detail_nominalwidth_filter'));
        $('.current-nominalwidth-filter').addClass('d-none').removeClass('d-inline-block');
        current_nominal_width_filter.forEach(function(item) {
            $('.current-nominalwidth-' + item).addClass('d-inline-block').removeClass('d-none');
        });
    }

    $('.nominalwidth-filter').each(function( index ) {
        if(current_nominal_width_filter.includes($(this).data('value').toString())) {
            $(this).addClass('filter-active').removeClass('filter-not-active');
        } else {
            $(this).removeClass('filter-active').addClass('filter-not-active');
        }
    });

    if (localStorage.getItem('detail_material_filter') === null) {
        var current_detail_material_filter = [];
        localStorage.setItem('detail_material_filter', JSON.stringify(current_detail_material_filter))
    } else {
        current_detail_material_filter = JSON.parse(localStorage.getItem('detail_material_filter'));
        $('.current-material-filter').addClass('d-none').removeClass('d-inline-block');
        current_detail_material_filter.forEach(function(item) {
            $('.current-material-' + item).addClass('d-inline-block').removeClass('d-none');
        });
    }

    $('.material-filter').each(function( index ) {
        if(current_detail_material_filter.includes($(this).data('value').toString())) {
            $(this).addClass('filter-active').removeClass('filter-not-active');
        } else {
            $(this).removeClass('filter-active').addClass('filter-not-active');
        }
    });

    reloadFilter('start', 'start');

    // changing filter on click for "Belastungsklassen"

    $('.loadcap-filter').click(function(){

        var chosen_loading_class = $(this).data('value');

        // local storage handling
        current_filter = JSON.parse(localStorage.getItem('detail_loadcap_filter'));

        // check if element exists
        if (current_filter.includes(chosen_loading_class)) {
            current_filter = current_filter.filter(e => e !== chosen_loading_class)
        } else { 
            current_filter.push(chosen_loading_class);
        }
        
        localStorage.setItem('detail_loadcap_filter', JSON.stringify(current_filter));

        $('.current-loadingclass-filter').addClass('d-none').removeClass('d-inline-block');
    
        current_filter.forEach(function(item) {
            $('.current-loadingclass-' + item).addClass('d-inline-block').removeClass('d-none');
        });

        // showing button as active or not
        if ($(this).hasClass('filter-active')) {
            $(this).removeClass('filter-active');
            $(this).addClass('filter-not-active');

        } else {
            $(this).addClass('filter-active');
            $(this).removeClass('filter-not-active');
        }

        reloadFilter('loadcap', $(this).hasClass('filter-active'));
    });

    // changing filter on click for "Nennweite"

    $('.nominalwidth-filter').click(function(){

        var chosen_nominal_width = $(this).data('value').toString();

        // local storage handling
        current_nominal_width_filter = JSON.parse(localStorage.getItem('detail_nominalwidth_filter'));

        // check if element exists
        if (current_nominal_width_filter.includes(chosen_nominal_width)) {
            current_nominal_width_filter = current_nominal_width_filter.filter(e => e !== chosen_nominal_width)
        } else { 
            current_nominal_width_filter.push(chosen_nominal_width);
        }
        
        localStorage.setItem('detail_nominalwidth_filter', JSON.stringify(current_nominal_width_filter));

        $('.current-nominalwidth-filter').addClass('d-none').removeClass('d-inline-block');
    
        current_nominal_width_filter.forEach(function(item) {
            $('.current-nominalwidth-' + item).addClass('d-inline-block').removeClass('d-none');
        });

        // showing button as active or not
        if ($(this).hasClass('filter-active')) {
            $(this).removeClass('filter-active');
            $(this).addClass('filter-not-active');

        } else {
            $(this).addClass('filter-active');
            $(this).removeClass('filter-not-active');
        }

        reloadFilter('nominalwidth', $(this).hasClass('filter-active'));
    });

     // changing filter on click for "Material"

    $('.material-filter').click(function(){

        var chosen_material = $(this).data('value').toString();

        // local storage handling
        current_detail_material_filter = JSON.parse(localStorage.getItem('detail_material_filter'));

        // check if element exists
        if (current_detail_material_filter.includes(chosen_material)) {
            current_detail_material_filter = current_detail_material_filter.filter(e => e !== chosen_material)
        } else { 
            current_detail_material_filter.push(chosen_material);
        }
        
        localStorage.setItem('detail_material_filter', JSON.stringify(current_detail_material_filter));

        $('.current-material-filter').addClass('d-none').removeClass('d-inline-block');
    
        current_detail_material_filter.forEach(function(item) {
            $('.current-material-' + item).addClass('d-inline-block').removeClass('d-none');
        });

        // showing button as active or not
        if ($(this).hasClass('filter-active')) {
            $(this).removeClass('filter-active');
            $(this).addClass('filter-not-active');

        } else {
            $(this).addClass('filter-active');
            $(this).removeClass('filter-not-active');
        }

        reloadFilter('material', $(this).hasClass('filter-active'));
    });

    // popup button confirmation
    $('.buttons button').click(function(){
        if ($(this).data('value') == 'yes') {
            // remove all filter on start
            localStorage.setItem('loadcap_filter', JSON.stringify([]));
            localStorage.setItem('nominalwidth_filter', JSON.stringify([]));
            localStorage.setItem('material_filter', JSON.stringify([]));

            if ($(this).hasClass('loadcap')) {
                current_detail_loadcap_filter = JSON.parse(localStorage.getItem('detail_loadcap_filter'));
                localStorage.setItem('loadcap_filter', JSON.stringify(current_detail_loadcap_filter));
            } else if ($(this).hasClass('nominalwidth')) {
                current_detail_nominalwidth_filter = JSON.parse(localStorage.getItem('detail_nominalwidth_filter'));
                localStorage.setItem('nominalwidth_filter', JSON.stringify(current_detail_nominalwidth_filter));
            } else if ($(this).hasClass('material')) {
                current_detail_material_filter = JSON.parse(localStorage.getItem('detail_material_filter'));
                localStorage.setItem('material_filter', JSON.stringify(current_detail_material_filter));
            }

            localStorage.setItem('detail_loadcap_filter', JSON.stringify([]));
            localStorage.setItem('detail_nominalwidth_filter', JSON.stringify([]));
            localStorage.setItem('detail_material_filter', JSON.stringify([]));

            window.location.href = "/rost-designs/uebersicht/";
        } else {
            if($(this).hasClass('loadcap')) {
                localStorage.setItem('detail_loadcap_filter', JSON.stringify([]));
                localStorage.setItem('loadcap_filter', JSON.stringify([]));
            }
            if($(this).hasClass('nominalwidth')) {
                localStorage.setItem('detail_nominalwidth_filter', JSON.stringify([]));
                localStorage.setItem('nominalwidth_filter', JSON.stringify([]));
            }
            if($(this).hasClass('material')) {
                localStorage.setItem('material_filter', JSON.stringify([]));
                localStorage.setItem('detail_material_filter', JSON.stringify([]));
            }
            location.reload();
        }

        $('.popup-rost-design').addClass('d-none');
        $('.popup-rost-design .text').addClass('d-none');

    });

    $('.remove-all-filter').click(function(){
        localStorage.setItem('detail_loadcap_filter', JSON.stringify([]));
        localStorage.setItem('detail_nominalwidth_filter', JSON.stringify([]));
        localStorage.setItem('detail_material_filter', JSON.stringify([]));
        $('.product-detail .d-none').removeClass('d-none');
        $('.filter-active').addClass('filter-not-active').removeClass('filter-active')
        $('.close-filter').click();
        $('.remove-all-filter').addClass('d-none')
    });
});