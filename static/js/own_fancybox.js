$(document).ready(function () {
    $('.fancybox-img').click(function(e){
        e.preventDefault();
        var title = '';
        var subtitle = '';
        if (title) {
            title =  $(this).attr('title')  
        }

        if ($(this).attr('subtitle')) {
            subtitle = $(this).attr('subtitle') 
        }

        if (!$(this).attr('rel')) {
            var id = $(this).attr('id');
            var template = '<div class="own-fancybox-wrapper-stage" id="'+ id +'"><div class="own-fancybox-header"><div class="title light"><p>' + title + '</p></div></div><div class="own-fancybox-stage"><div class="image"><img src="' + $(this).attr('href') + '"></div></div></div>';
            $('.own-fancybox-stages').empty().append(template);
            $('.own-fancybox').removeClass('d-none');
        } else {
            var rel = $(this).attr('rel');
            var thumbnail_images_template = '';
            var element_index = 0;

            if ($(this).attr('data-index')) {
                var element_index = $(this).attr('data-index') - 1;
            }
            
            $('.own-fancybox-stages').empty();
            $( '.fancybox-img[rel=' + rel + ']').each(function( index ) {
                if (index == element_index) {
                    hide_show = '';
                } else {
                    hide_show = ' d-none'
                }

                if ($( '.fancybox-img[rel=' + rel + ']').length > index + 1) {
                    var next = rel.toString() + (index + 1).toString()
                } else {
                    var next = $('.own-fancybox-wrapper-stage').first().attr('id');
                }

                if (index > 0) {
                    var prev = rel.toString() + (index - 1).toString()
                } else {
                    var last_index = ($('.fancybox-img[rel=' + rel + ']').length * 1) - 1;
                    var prev = rel.toString() + last_index.toString()
                }
  
                var current = rel.toString() + index.toString();
                var template = '<div class="own-fancybox-wrapper-stage' + hide_show + '" id="'+ rel + index +'"><div class="own-fancybox-header"><div class="title light"><p>' + title + '</p></div><div class="subtitle light"><p>' + subtitle + '</p></div></div><div class="own-fancybox-stage"><div class="image"><img src="' + $(this).attr('href') + '"></div></div><div class="own-fancybox-footer"><div class="prev" data-current="' + current + '" data-prev="' + prev + '"></div><div class="next" data-current="' + current + '" data-next="' + next + '"></div></div></div>';
                $('.own-fancybox-stages').append(template);

                thumbnail_images_template += '<div id="thumbnail-'+ rel + index +'" class="thumbnail-image" style="background-image:url('+ $(this).data('thumbnail') + ')">&nbsp;</div>';
            
            });
            $('.own-fancybox').removeClass('d-none');

            var thumbnail_template = '<div class="thumbnails d-none d-md-flex">' + thumbnail_images_template + '</div>';

            $('.own-fancybox-wrapper-stage .own-fancybox-footer').append(thumbnail_template);
        }

        $('.own-fancybox-wrapper-stage:not(.d-none) .thumbnail-image#thumbnail-' + rel.toString() + element_index.toString()).addClass('active');

        // if($(this).attr('rel') != 'group-360' && $(this).attr('rel') != 'group-360-variant') {
        //     $('.own-fancybox-stage .image img').css('border','15px solid white')
        // }
    });
    $('.own-fancybox').click(function(e){
        if(e.target.parentElement.className != 'own-fancybox-footer' && e.target.parentElement.className != 'thumbnails') {
            $('.own-fancybox-stages').empty();
            $('.own-fancybox').addClass('d-none');
        }
    });

    $('.own-fancybox-stages').on('click','.own-fancybox-footer .next', function(){
        var current_stage_id = $(this).data('current');
        var next_stage_id = $(this).data('next');
        $('#'+ current_stage_id).addClass('d-none');
        $('#'+ next_stage_id).removeClass('d-none');

        $('.own-fancybox-wrapper-stage:not(.d-none) #thumbnail-'+ current_stage_id).removeClass('active');
        $('.own-fancybox-wrapper-stage:not(.d-none) #thumbnail-'+ next_stage_id).addClass('active');
    });

    $('.own-fancybox-stages').on('click','.own-fancybox-footer .prev', function(){
        var current_stage_id = $(this).data('current');
        var prev_stage_id = $(this).data('prev');

        $('#'+ current_stage_id).addClass('d-none');
        $('#'+ prev_stage_id).removeClass('d-none');

        $('.own-fancybox-wrapper-stage:not(.d-none) #thumbnail-'+ current_stage_id).removeClass('active');
        $('.own-fancybox-wrapper-stage:not(.d-none) #thumbnail-' + prev_stage_id).addClass('active');
    });

    $('.own-fancybox-stages').on('click','.own-fancybox-footer .thumbnail-image', function(){
        var current_stage_id = $('.thumbnail-image.active').attr('id');
        var next_stage_id = $(this).attr('id');
        var current_stage = current_stage_id.replace('thumbnail-','')
        var next_stage = next_stage_id.replace('thumbnail-','')
        console.log('#'+ current_stage + ' #' + current_stage_id)
        console.log('#'+ next_stage + ' #' + next_stage_id)

        $('#'+ current_stage + ' #' + current_stage_id).removeClass('active');
        $('#'+ next_stage + ' #' + next_stage_id).addClass('active');
        
        $('#'+ current_stage).addClass('d-none');
        $('#'+ next_stage).removeClass('d-none');
    });

});