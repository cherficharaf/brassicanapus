
$('#search input').on('keypress', (e)=>{
    if(e.charCode == 13){
        if($('#formulaire input').val().length == 0){
            $('.err').show()
            setTimeout(() => {
                $('.err').hide()
            }, 2000);
        }
    
        else{
    
            // animation
            $('.animation').show()
            $.ajax({
                type:'POST',
                url:'/search',
                data:{family:$('#formulaire input').val()},
                beforeSend:function(){
                    console.log('....en cours')
                },
                success:function(r){
                    $('.animation').hide()
                    if(r.msg == "pas bon"){
                        $('.notfound').show()
                        
    
                        setTimeout(() => {
                            $('.notfound').hide()
                        }, 2000);
                    }
                    else{
                        
                        window.location.href = "/search"
                    }
                   
                }
            })
        }
    }
})

$('#search button').on('click', function(e){

    if($('#formulaire input').val().length == 0){
        $('.err').show()
        setTimeout(() => {
            $('.err').hide()
        }, 2000);
    }

    else{

        // animation
        $('.animation').show()
        $.ajax({
            type:'POST',
            url:'/search',
            data:{family:$('#formulaire input').val()},
            beforeSend:function(){
                console.log('....en cours')
            },
            success:function(r){
                $('.animation').hide()
                if(r.msg == "pas bon"){
                    $('.notfound').show()
                    

                    setTimeout(() => {
                        $('.notfound').hide()
                    }, 2000);
                }
                else{
                    
                    window.location.href = "/search"
                }
               
            }
        })
    }
})


/*-----------------------------*/

$('#prc').on('keypress',(e)=>{
    
    if(e.charCode == 13){

        if($('#prc').val().length == 0){
            $('#prc').css('border', "1px solid red")
            setTimeout(() => {
                $('#prc').css('border', "1px solid rgb(199, 196, 196)")                
            }, 2000);
        }

        else{
            var gc = 0
            var seq = $('#prc').val()
            for(var i = 0; i < seq.length ; i++){
                if(seq[i].toUpperCase() == "C" || seq[i].toUpperCase() == "G"){
                    gc++
                }
            }

            $('.resprc').text(`${(gc / seq.length * 100).toFixed()}`+ "%")
        }


    }
})