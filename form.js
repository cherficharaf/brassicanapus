

$('#additem').on('click', function(){
    if($('#description_').val() == "" || $('#bnapus').val() == "" || $('#lienbnapus').val() == "" || $('#athaliana').val() == '' 
        || $('#lienathaliana').val() == "" || $('#brapa').val() == "" || $('#lienbrapa').val() == "" || $('#blast').val() == "" || $('#img').val() == ""

    ){
        $('.err_saisie').slideDown()
        setTimeout(() => {
            $('.err_saisie').slideUp()
        }, 2000);
    }


    else{
        console.log($('#db').val())
        
        var obj = {
            db:$('#db').val(),
            description:$('#description_').val(),
            bnapus:$('#bnapus').val(),
            lienbnapus:$('#lienbnapus').val(),
            athaliana:$('#athaliana').val(),
            lienathaliana:$('#lienathaliana').val(),
            brapa:$('#brapa').val(),
            lienbrapa:$('#lienbrapa').val(),
            blast:$('#blast').val(),
            img:$('#img').val(),
        
        }


        $('.animation').show()

        $.ajax({
            type:'POST',
            url:'/additem',
            data:obj,
            success:function(r){
                $('.animation').hide()
                $('.success').slideDown()
                $('input').val('')
                setTimeout(() => {
                    $('.success').slideUp()
                }, 3000);
            }
        })
    }
})