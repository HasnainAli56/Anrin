// Core navigation functionality
$(function() {
    // Navigation handlers
    $('#openQuickNav').on('click', function () {
        $('#quickNav').toggleClass('active');
        if ($('#quickNav').hasClass('active')) {
            $('#langDropdownMenu').removeClass('active');
        }
    });

    $('#langDropdownMobile').on('click', function () {
        $('#langDropdownMenu').toggleClass('active');
        if ($('#langDropdownMenu').hasClass('active')) {
            $('#quickNav').removeClass('active');
        }
    });

    // Search handling
    $(document).on("keydown", ".search-input", function(e) {
        if (e.key === "Enter") {
            let form = $(this).closest("form")[0];
            if (form) form.requestSubmit();
        }
    });
});
