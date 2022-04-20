window.addEventListener("load",()=>{
    let ajaxClass = new AjaxClass();

    //Comunitats
    ajaxClass.carregarContingut('/Server/comunitats.php','GET',null,function (text){
        let tags = text.getElementsByTagName('ca');
        let desplegable = document.getElementById('ca_name');
        let optBuit = document.createElement('option');
        optBuit.value = '-1';
        optBuit.innerText = '';
        desplegable.appendChild(optBuit);
        for(let tag of tags){
            let codi = tag.children[0].textContent;
            let nom = tag.children[1].textContent;
            let opt = document.createElement('option');
            opt.value = codi;
            opt.innerText = nom;
            desplegable.appendChild(opt);
        }
    })

    //Provincies
    document.getElementById('ca_name').addEventListener('change',
        function (event){
            console.log(event.target.value);
            /*Caldria controlarla que no fos -1, que hauria de netejar tot el que hi ha per sota*/

            ajaxClass.carregarContingut('/Server/provinciesByComunitat.php','POST','codiCom='+event.target.value,function (text){
                console.log(text.getElementsByTagName('prov')[1]);


                let provincia = document.getElementById('pr_name');
                provincia.innerHTML="";

                let illa = document.getElementById('il_name');
                illa.innerHTML="";

                let municipi = document.getElementById('mu_name');
                municipi.innerHTML="";

                for (let i=0; i<document.getElementsByClassName('hidden').length; i++){
                    document.getElementsByClassName('hidden')[i].classList.add("hidden")
                }

                let tags = text.getElementsByTagName('prov')
                let desplegable2 = document.getElementById('pr_name');
                desplegable2.length = 0;
                let optBuit = document.createElement('option');
                optBuit.value = '-1';
                optBuit.innerText = '';
                desplegable2.disabled = false;
                desplegable2.appendChild(optBuit);
                for(let tag of tags){
                    let codiCom = tag.children[0].textContent;
                    let nom = tag.children[1].textContent;
                    let opt = document.createElement('option');
                    opt.value = codiCom;
                    opt.innerText = nom;
                    desplegable2.appendChild(opt);
                }
            });
            document.getElementById('pr_name').addEventListener('change',
                function (event){
                    console.log(event.target.value);

                    ajaxClass.carregarContingut('/Server/illes.php','POST','codiProv='+event.target.value,function (text) {
                        if (!(text.getElementsByTagName('illa').length>0)){

                            for (let i=0; i<document.getElementsByClassName('hidden').length; i++){
                                document.getElementsByClassName('hidden')[i].classList.add("hidden")
                            }

                            document.getElementById("mu_name").options.length=0;
                            ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiProv=' + event.target.value, function (text) {
                                let tags = text.getElementsByTagName('mun');

                                let desplegable3 = document.getElementById('mu_name');
                                desplegable3.length = 0;
                                let optBuit = document.createElement('option');
                                console.log(text)
                                optBuit.value = '-1';
                                optBuit.innerText = '';
                                desplegable3.disabled = false;
                                desplegable3.appendChild(optBuit);
                                console.log(event.target.value)
                                for (let tag of tags) {
                                    let codi = tag.children[0].textContent;
                                    let nom = tag.children[1].textContent;
                                    let opt = document.createElement('option');
                                    opt.value = codi;
                                    opt.innerText = nom;
                                    desplegable3.appendChild(opt);
                                }
                            });

                        }else {
                            document.getElementsByClassName('hidden')[0].classList.remove("hidden");

                            let tags = text.getElementsByTagName('illa');
                            let desplegable3 = document.getElementById('il_name');
                            desplegable3.length = 0;
                            let optBuit = document.createElement('option');

                            optBuit.value = '-1';
                            optBuit.innerText = '';
                            desplegable3.className = "";
                            desplegable3.appendChild(optBuit);

                            for (let tag of tags) {
                                let codi = tag.children[0].textContent;
                                let nom = tag.children[1].textContent;
                                let opt = document.createElement('option');
                                opt.value = codi;
                                opt.innerText = nom;
                                desplegable3.appendChild(opt);
                            }

                            document.getElementById('il_name').addEventListener('change',
                                function (event) {

                                    ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiIlla=' + event.target.value, function (text) {
                                        let tags = text.getElementsByTagName('mun');
                                        let desplegable3 = document.getElementById('mu_name');
                                        desplegable3.length = 0;
                                        let optBuit = document.createElement('option');
                                        console.log(text)
                                        optBuit.value = '-1';
                                        optBuit.innerText = '';
                                        desplegable3.disabled = false;
                                        desplegable3.appendChild(optBuit);
                                        console.log(event.target.value)
                                        for (let tag of tags) {
                                            let codi = tag.children[0].textContent;
                                            let nom = tag.children[1].textContent;
                                            let opt = document.createElement('option');
                                            opt.value = codi;
                                            opt.innerText = nom;
                                            desplegable3.appendChild(opt);
                                        }
                                    })
                                })
                        }
                    })

                })

        })
});