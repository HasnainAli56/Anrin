$(function () {
    // Newsletter handling
    $(document).on("click", "#newsletter .button", function() {
        setTimeout(function() { 
            var valid1 = $("#newsletter input[type='checkbox']").hasClass("valid");
            var valid2 = $("#newsletter input[type='email']").hasClass("valid");
            if (valid1 && valid2) {
                $("#mc_embed_signup").remove();
                $(".success").removeClass("d-none");
            }
        }, 2000);
    });

    // Reset filter
    if (!$(location).attr("href").toString().includes("rost-designs")) {
        localStorage.setItem('detail_nominalwidth_filter', JSON.stringify([]));
        localStorage.setItem('detail_material_filter', JSON.stringify([]));
        localStorage.setItem('detail_loadcap_filter', JSON.stringify([]));
        localStorage.setItem('loadcap_filter', JSON.stringify([]));
        localStorage.setItem('nominalwidth_filter', JSON.stringify([]));
    }
});
