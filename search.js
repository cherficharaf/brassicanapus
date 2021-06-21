gene_desc = {
    HSF:`HSF (heat stress transcription factors) play a crucial role in plants response to several abiotic stresses by regulating 
    the expression of stress-responsive genes, such as heat shock proteins (Hsps) this list contain genes that are expressed in this condition`,

    AP2:`
    the APETALA2/ETHYLENE RESPONSIVE FACTOR (AP2/ERF) family transcription factors (AP2/ERFs) have emerged as key regulators of various stress responses, 
    in which they also respond to hormones with improved plant survival during stress conditions as 
    such as extreme temperature, water scarcity and high salinity
    `,

    NAC: `
    
    NAC transcription factors are one of the largest families of transcriptional regulators in plantsin which they also respond to hormones with 
    improved plant survival during stress conditions as such as extreme temperature, cold and hormone treatment NAC acronym is derived from three
     genes that were initially discovered to contain a particular domain (the NAC domain): 
    NAM (for no apical meristem), ATAF1 and −2, and CUC2 (for cup-shaped cotyledon)
    `,
    MADS:`
    The MADS-box family genes encode transcription factors (TFs), which are widely distributed in eukaryotes and play 
    fundamental roles in diverse biological functions .The name MADS-box is derived from the initials of four transcription 
    factors that were first discovered of this family: 
    MINICHROMOSOME MAINTENANCE 1 (MCM1), AGAMOUS (AG), DEFICIENS (DEF), and SERUM RESPONSE FACTOR (SRF)
    `,
    WRKY:`
    The WRKY gene family is a plant-specific transcription factor (TF) group, playing important roles in many 
    different response pathways of diverse abiotic 
    stresses (drought, saline, alkali, temperature, and ultraviolet radiation, and so forth).
    `
}





function BuildTr(data){
    
    
    var template = `
    
            <tr class="">
                <th>GENE DESCRIPTION</th>
                <th>B NAPUS NCBI ID</th>
                <th>A THALIANA NCBI ID</th>
                <th>B RAPA NCBI ID</th>
                <th>BLAST DESCRIPTION</th>
                <th>Delete</th>
            </tr>
    `
    
    $('table').empty()
    data.forEach(gene => {
       
        template += `        
            <tr id="record_${gene.id}">
                
                <td>${gene.description}</td>
                <td><a href="${gene.lienbnapus}">${gene.bnapus}</a></td>
                <td><a href="${gene.lienathaliana}">${gene.athaliana}</a></td>
                <td><a href="${gene.lienbrapa}">${gene.brapa}</a></td>
                <td><span class="blast" onclick="ShowImage('${gene.img}')">${gene.blast} </span></td>

                <td style="text-align:center">
                    <i class="fas fa-trash" onclick="deleteRecord(${gene.id})"></i>
                    
                </td>
                                
            </tr>
        `

        
        
    });
    $('table').html(template)
    
    
}



$('.close').on('click', function(){
    $('#voile').hide()
})

BuildTr(JSON.parse(d))

function ShowImage(arg){
    var src = arg.slice(0,3).toLowerCase()
    console.log(src)
    console.log(arg)
    $('#voile img').attr('src', `${src}/${arg}`).show()
    
    $('#voile').show()
    
}


$.ajax({
    type:'POST',
    url:'/getcurdb',
    data:{get:'db'},
    success:function(res){
        $('#gene_desc h2').text(res.db)
        $('#gene_desc .content').text(gene_desc[res.db])
    }
})

/*-------------------------------------------------------------------------------------------------*/
function deleteRecord(id){
    $('.animation').show()

    $('#record_' + id).addClass('todelete')
    

    $.ajax({
        type:'POST',
        url:'/deleterecord',
        data:{id:id},
        success:(res)=>{
            if(res.msg == "bon"){
                $('#record_' + id).slideUp() 
                $('.animation').hide()

            }
        }
    })
    
}
/*-------------------------------------------------------------------------------------------------------------------------------*/

$('#ssearch input').on('keypress', (e)=>{

    if(e.charCode == 13){
        if($('#sformulaire input').val().length == 0){
            $('.serr').show()
            setTimeout(() => {
                $('.serr').hide()
            }, 2000);
        }
    
        else{
    
            // animation
            $('.animation').show()
            $.ajax({
                type:'POST',
                url:'/search',
                data:{family:$('#sformulaire input').val()},
                beforeSend:function(){
                    console.log('....en cours')
                },
                success:function(r){
                    $('.animation').hide()
                    if(r.msg == "pas bon"){
                        $('.snotfound').show()
                        
    
                        setTimeout(() => {
                            $('.snotfound').hide()
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

