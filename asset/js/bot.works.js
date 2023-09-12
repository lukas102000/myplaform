/*
*
*/
const Urls = url_list
    

var tpcs_link = 0
var tpc_done = 0
var saldo = 0
var saldo_coin = 0


// bot functions
function bot_works (){
    
    //const deafult_url_api = ''
    const default_saldo = 5
    const gncoin = 0.005
    const iframe = document.getElementById('inpuIframe')
    var saldo_view = document.getElementById('saldo_views')
    var tpc_views = document.getElementById('tpc_views')
    var tpc_works = document.querySelectorAll('#tpc_works')

    // add autos reads and views

    if(tpcs_link < Urls.length){
        iframe.src = Urls[tpcs_link]
        tpc_works.item(tpcs_link).innerHTML = 'Tarefas concluída'
        tpc_done += 1
        saldo = saldo + default_saldo
        saldo_coin = saldo_coin + gncoin
        saldo_view.innerHTML = `AOA ${saldo}`
        tpc_views.innerHTML = `Tarefas concluídaS: ${tpc_done}`
        tpc_works.item(tpcs_link).setAttribute('disabled', 'true')
        tpc_works.item(tpcs_link).style.backgroundColor = 'rgb(168, 168, 168)'
        tpcs_link += 1

        if(localStorage.getItem('myBalanceGnc') === null){ 
            localStorage.setItem('myBalanceGnc', gncoin )
            localStorage.setItem('myBalanceAOA',default_saldo)
        }else{
            var myBalanceGnc = parseFloat(localStorage.getItem('myBalanceGnc'))
            var myBalanceAOA = parseFloat(localStorage.getItem('myBalanceAOA'))
            localStorage.setItem('myBalanceGnc', myBalanceGnc = myBalanceGnc + gncoin )
            localStorage.setItem('myBalanceAOA', myBalanceAOA = myBalanceAOA + default_saldo)
        }
        window.localStorage.setItem('saldo', saldo)
        window.localStorage.setItem('gncoin', saldo_coin)


    } else{
        //tpcs_link = 0 
        for(let x=0; x < tpc_works; x++){
            tpc_works.item(x).setAttribute('href', Urls[0])
            tpc_works.item(x).innherHTML = 'Executar a tarefa'
            tpc_works.item(x).style.backgroundColor = 'rgb(0, 110, 255)'
        }
    }

}
// bot start
function start_bot (el){
    el.style.backgroundColor = 'green'
    setInterval(()=>{
        bot_works()
    }, 2000)
}

// appends all urles 

function list_of_tpc (url){
    const div = document.createElement('div')
    div.innerHTML = 
    `
    <p>Execute está tarefa e ganha 0,00001 GNCoin = AOA 0,5 </p>
    <button id="tpc_works" class='${url}' onclick='manual_works(this)' >Executar a tarefa </button>
    `
    document.querySelector('.tarefas-list').appendChild(div)
}
function manual_works (el){
    const url = el.classList[0]
    const default_saldo = 5
    const gncoin = 0.005
    var iframe = document.createElement('a')
    window.location.href = url
    
    var saldo_view = document.getElementById('saldo_views')
    var tpc_views = document.getElementById('tpc_views')
    //iframe.src = url
    el.innerHTML = 'Tarefa em execução'
    setTimeout(()=>{ 
        el.setAttribute('disabled', 'true')
        el.innerHTML = 'Tarefa concluída 10s'
        
        tpc_done += 1
        saldo = saldo + default_saldo
        saldo_coin = saldo_coin + gncoin
        saldo_view.innerHTML = `AOA ${saldo}`
        tpc_views.innerHTML = `Tarefas concluídaS: ${tpc_done}`
        el.style.backgroundColor = 'rgb(168, 168, 168)'
        tpcs_link += 1

        window.localStorage.setItem('saldo', saldo)
        window.localStorage.setItem('gncoin', saldo_coin)
        if(localStorage.getItem('myBalanceGnc') === null){ 
            localStorage.setItem('myBalanceGnc', gncoin )
            localStorage.setItem('myBalanceAOA',default_saldo)
        }else{
            var myBalanceGnc = parseFloat(localStorage.getItem('myBalanceGnc'))
            var myBalanceAOA = parseFloat(localStorage.getItem('myBalanceAOA'))
            localStorage.setItem('myBalanceGnc', myBalanceGnc = myBalanceGnc + gncoin )
            localStorage.setItem('myBalanceAOA', myBalanceAOA = myBalanceAOA + default_saldo)
        }
        
    }, 11000)
}

Urls.map((ls)=>( list_of_tpc(ls) ))
document.getElementById('tpc_count').innerHTML = `Tarefas totoal ${Urls.length}`