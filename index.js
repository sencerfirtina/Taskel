const girdi = document.querySelector("#gorevinput");
const gorevliste = document.querySelector("#gorevlistesi");
const goreveklebtn = document.querySelector("#eklebtn");
const takvim = document.querySelector("#takvim");
const takvim_dis = document.querySelector("#takvimdis");
const exp = document.querySelector("#exp");
const level = document.querySelector("#level");
const finn = document.querySelector("#finn");
const balon = document.querySelector("#talk");
const info = document.querySelector("#info");
const muzik_calar = document.querySelector("#muzik-calar");
const play_btn = document.querySelector("#playdiv");
const pause_btn = document.querySelector("#pausediv");
const next_btn = document.querySelector("#nextdiv");
const prev_btn = document.querySelector("#prevdiv");
const sarki_adi = document.querySelector("#muzikad");
const gunluk_gorev_p = document.querySelector("#gunluk-gorev");
const gorevcheck = document.querySelector("#gorevcheck");
const ay_isim = document.querySelector("#ay-isim");
const onceki_ay_buton = document.querySelector("#onceki-ay-buton");
const sonraki_ay_buton = document.querySelector("#sonraki-ay-buton");
let finn_mesgul = false;
let balon_sayac;
let siradaki_sarki = 0;
const tarih = new Date();
let year = tarih.getFullYear();
let month = tarih.getMonth();
const day = tarih.getDate();

let hareketsizlik_sayaci;
const beklemesuresi = 10000;

const gunler = ["Pt","Sa","Ça","Pe","Cu","Ct","Pa"];
const aylar = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
];
const tasks = [];
const gorev_yapilan_gunler = [];

const konusmalar = {
    "basari":[
        "efsanesin.gif",
        "yes.gif",
        "easy.gif",
        "boyle_devam.gif"
    ],

    "silme":[
        "boom.gif",
        "cope_gitti.gif",
        "yer_acildi.gif"
    ],

    "geri-alma":[
        "kucuk_bir_hata.gif",
        "acik_surat.gif",
        "olamaz.gif",
        "opsie.gif"
    ],

    "bos":[
        "duz_surat.gif",
        "orada_misin.gif",
        "sikildim.gif",
        "zzz.gif",
        "duz_surat.gif"
    ],

    "level-up":[
        "level-up.gif",
        "on-fire.gif",
        "yey.gif"
    ],

    "gorev-eklendi":[
        "bir-tane-daha.gif",
        "challenge.gif",
        "aa.gif"
    ]
};
const muzikler = [
    {isim:"Good Night Lofi", link:"Musics/good-night-lofi.mp3"},
    {isim:"Lofi Calm Study", link:"Musics/lofi-calm-study.mp3"},
    {isim:"Chill Study Lofi", link:"Musics/chill-study-lofi.mp3"},
    {isim:"Rainy Lofi City", link:"Musics/rainy-lofi-city.mp3"},
    {isim:"Just Relax", link:"Musics/just-relax.mp3"},
    {isim:"Study", link:"Musics/study.mp3"}
];
const gunluk_gorev_isimler = [
    "Bugün en az 2 litre su içmeyi dene",
    "10 dakika esneme hareketleri yap",
    "Kisa bir yuruyuse cik ve temiz hava al",
    "Bugun asansor yerine merdivenleri kullan",
    "En az 10 sayfa kitap oku",
    "Telefonsuz 30 dakika gecir",
    "Yarina dair en onemli 3 hedefini bugunden belirle",
    "Odani havalandir",
    "Minimum 3 adet gereksiz dosya sil",
    "Sevdigin bir sarkiyi ac ve kendini ritme birak"
];

const bu_aya_don = () => {
    const simdi = new Date();
    month = simdi.getMonth();
    year = simdi.getFullYear();
    takvim_ciz();
}

const onceki_aya_gec = () =>{
    if(month == 0){
        year--;
        month = 11;
    }
    else{
        month--;
    }

    takvim_ciz();
}

const sonraki_aya_gec = () =>{
    if(month == 11){
        year++;
        month = 0;
    }
    else{
        month++;
    }

    takvim_ciz();
}

const gunluk_gorev_onerici = () => {
    const bugun = tarih_string();
    const kayitli_tarih = localStorage.getItem("oneri_tarih");
    if(kayitli_tarih === null || kayitli_tarih != bugun){
        const rastgele = Math.floor(Math.random() * gunluk_gorev_isimler.length);
        const yeni_oneri = gunluk_gorev_isimler[rastgele];
        localStorage.setItem("oneri_isim",yeni_oneri);
        localStorage.setItem("oneri_tarih",bugun);
        localStorage.setItem("oneri_check",false);
        gunluk_gorev_p.innerText = yeni_oneri;
        gorevcheck.checked = false;
    }
    else{
        const gunluk_gorev = localStorage.getItem("oneri_isim");
        const durum = localStorage.getItem("oneri_check");
        gunluk_gorev_p.innerText = gunluk_gorev;
        if(durum == "true"){
            gorevcheck.checked = true;
            gunluk_gorev_p.classList.add("tamamlandi");
        }
    }
}

const muzik_oynat = () => {
    const sarki = muzikler[siradaki_sarki];
    muzik_calar.src = sarki.link;
    sarki_adi.innerText = sarki.isim;
    muzik_calar.play();
    play_btn.style.display = "none";
    pause_btn.style.display = "flex";
    finn.classList.add("finn-dans");
}

const muzik_durdur = () => {
    muzik_calar.pause();
    sarki_adi.innerText = "Nothing";
    pause_btn.style.display = "none";
    play_btn.style.display = "flex";
    finn.classList.remove("finn-dans");
}

const siradaki_muzik = () => {
    if((siradaki_sarki + 1) == muzikler.length){
        siradaki_sarki = 0;
    }
    else{
        siradaki_sarki++;
    }
    muzik_oynat();
}

const onceki_muzik = () => {
    if((siradaki_sarki - 1) == -1){
        siradaki_sarki = (muzikler.length) - 1; 
    }
    else{
        siradaki_sarki--;
    }
    muzik_oynat();
}

const balon_sec = (durum) => {
    const secenekler = konusmalar[durum];
    const rastgele = Math.floor(Math.random() * secenekler.length);
    const line = secenekler[rastgele];
    const tazeleyici = Date.now();
    balon.style.backgroundImage = `url("Resimler/Balonlar/${line}?v=${tazeleyici}")`;
}

const finn_bored = () => {
    if(finn.classList.contains("finn-dans")){
        return;
    }
    balon_sec("bos");
    finn.className = "finn-uyu";
}

const sayac_sifirla = () => {
    clearTimeout(hareketsizlik_sayaci);
    hareketsizlik_sayaci = setTimeout(finn_bored,beklemesuresi);

    if(finn_mesgul){
        return;
    }

    balon.style.backgroundImage = "none";

    if(finn.className === "finn-uyu"){
        finn.className = "finn-idle";
    }
}

const hareket_dinle = () => {
    window.addEventListener("mousemove",sayac_sifirla);
    window.addEventListener("keydown",sayac_sifirla);
    window.addEventListener("click",sayac_sifirla);
    sayac_sifirla();
}

const info_guncelle = () => {
    const yeni_sayi = tasks.filter(task=>task.tamamlandi).length;
    info.textContent = `${yeni_sayi} adet görev tamamlandı`;
}

const tarih_string = () => {
    const simdi = new Date();
    const y = simdi.getFullYear();
    const m = (simdi.getMonth() + 1).toString().padStart(2,"0");
    const d = simdi.getDate().toString().padStart(2,"0");
    const tarih_str = `${y}-${m}-${d}`;
    return tarih_str;
}

const updatexpbar = () => {
    const level_atlatacak = 5;
    if(!tasks){
        return;
    }
    const tum_gorevler = tasks.length;
    if(tum_gorevler === 0){
        exp.style.width = "0%";
        return;
    }
    const biten_gorevler = tasks.filter(gorev => gorev.tamamlandi === true).length;
       
    const anlik_level = Math.floor(biten_gorevler/level_atlatacak) + 1;
    level.innerText = `LVL ${anlik_level}`;
    const bu_leveldeki_ilerleme = biten_gorevler % level_atlatacak;
    const yuzde = (bu_leveldeki_ilerleme/level_atlatacak)*100;
    const ilerleme = `${yuzde}%`;
    exp.style.width = ilerleme;

}

const takvim_ciz = () => {
    takvim_sifirla();

    const gun_sayisi = new Date(year, month + 1,0).getDate();
    let baslangic_gunu = new Date(year,month,1).getDay();
    let bitis_gunu = new Date(year,month +1 ,0).getDay();
    const today = new Date().getDate();
    const this_month = new Date().getMonth();
    const this_year = new Date().getFullYear();
    console.log(today);
    if(baslangic_gunu == 0){
        baslangic_gunu = 6;
    }
    else{
            baslangic_gunu--;
    }
    if(bitis_gunu == 0){
        bitis_gunu = 6;
    }
    else{
        bitis_gunu--;
    }

    const blok_sayisi = baslangic_gunu + gun_sayisi;
    if(blok_sayisi > 35){
        takvim_dis.style.height = "538px";
    }
    else{
        takvim_dis.style.height = "480px";
    }

    
    for(let i = 0;i<7;i++){
        const gun_adlari_div = document.createElement("div");
        gun_adlari_div.classList.add("gunisim");
        gun_adlari_div.innerText = gunler[i];
        takvim.appendChild(gun_adlari_div);
    }

    for(let d = 0;d<baslangic_gunu;d++){
        const bos_gun_div = document.createElement("div");
        bos_gun_div.classList.add("bos");
        bos_gun_div.classList.add("day");
        takvim.appendChild(bos_gun_div);
    }

    for(let i=0;i<gun_sayisi;i++){
        const gun_div = document.createElement("div");

        const dongudeki_gun_str = (i+1).toString().padStart(2,"0");
        const dongudeki_ay_str = (month+1).toString().padStart(2,"0");
        const dongudeki_gun_tam = `${year}-${dongudeki_ay_str}-${dongudeki_gun_str}`;
        if(gorev_yapilan_gunler.includes(dongudeki_gun_tam)){
            gun_div.classList.add("bitmis_gun");
        }
        gun_div.classList.add("day");
        gun_div.innerText = i+1;
        if(i+1 == today && month == this_month && year == this_year){
            gun_div.classList.add("today");
        }
        takvim.appendChild(gun_div);
    }
    if(bitis_gunu < 6){
        const donus_miktari = 6-bitis_gunu;
        for(let d = 0;d<donus_miktari;d++){
            const bos_gun_div = document.createElement("div");
            bos_gun_div.classList.add("bos");
            bos_gun_div.classList.add("day");
            takvim.appendChild(bos_gun_div);
        }
    }
    ay_isim.innerText = `${aylar[month]} ${year}`;
} 

const takvim_guncelle_ciz = () =>{
    gorev_yapilan_gunler.length = 0;
    
    tasks.forEach(task =>{
        if(task.tamamlandi && task.tamamlanma_tarihi){
            if(!gorev_yapilan_gunler.includes(task.tamamlanma_tarihi)){
                gorev_yapilan_gunler.push(task.tamamlanma_tarihi);
            }
        }
    })

    tamamlanan_gunler_local();

    takvim_ciz();
}

const tamamlanan_gunler_local = () => {
    localStorage.setItem("tamamlanan_gunler",JSON.stringify(gorev_yapilan_gunler));
}

const kaydet = () => {
    localStorage.setItem("gorevler",JSON.stringify(tasks));
}

const listeye_ekleme = () => {
    const veri = girdi.value.trim();
    if(veri===""){
        return;
    }
    const gorev = {
        id:`gorev-${Date.now()}`,
        metin:girdi.value,
        tamamlandi:false,
        tamamlanma_tarihi:null
    };

    tasks.push(gorev);
    kaydet();

    const yeni_li = document.createElement("li");
    yeni_li.classList.add("elemanlar");
    yeni_li.dataset.id = gorev.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = veri;

    let deletebtn = document.createElement("button");
    deletebtn.innerHTML = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"> <path d="M16 2v4h6v2h-2v14H4V8H2V6h6V2h8zm-2 2h-4v2h4V4zm0 4H6v12h12V8h-4zm-5 2h2v8H9v-8zm6 0h-2v8h2v-8z" fill="currentColor"/> </svg>`;
    deletebtn.classList.add("delete-btn");

    yeni_li.appendChild(checkbox);
    yeni_li.appendChild(span);
    yeni_li.appendChild(deletebtn);
    gorevliste.appendChild(yeni_li);
    girdi.value = "";
    girdi.focus();

    if(balon_sayac){
        clearTimeout(balon_sayac);
    }
    finn_mesgul = true;
    finn.className = "finn-tik";
    balon_sec("gorev-eklendi");
    balon_sayac = setTimeout(()=>{
        finn_mesgul = false;
        finn.className = "finn-idle";
        balon.style.backgroundImage = "none";
    },3800);
}

goreveklebtn.addEventListener("click",() =>{
    listeye_ekleme();
    updatexpbar();  
});

girdi.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        listeye_ekleme();
        updatexpbar();
    }
});

gorevliste.addEventListener("click",(e)=>{
    if(e.target.tagName === "INPUT"){
        const biten_li = e.target.parentElement;
        const id = biten_li.dataset.id;
        const biten_gorev = tasks.find(t=> t.id === id);
        biten_gorev.tamamlandi = !biten_gorev.tamamlandi;
        biten_li.classList.toggle("tamamlandi");
        const biten_gorevler = tasks.filter(gorev => gorev.tamamlandi === true).length;
        if(balon_sayac){
            clearTimeout(balon_sayac);
        }
        if(biten_gorev.tamamlandi){
            if(!biten_gorev.tamamlanma_tarihi){
                biten_gorev.tamamlanma_tarihi = tarih_string();
            }
            if(biten_gorevler!=0 && biten_gorevler % 5 == 0){
                if(balon_sayac){
                    clearTimeout(balon_sayac);
                }

                finn_mesgul = true;

                finn.className = "finn-yuru";

                balon_sec("level-up");
            } 
            else{
                finn_mesgul = true;
                finn.className = "finn-saldir";
                balon_sec("basari");
            }
        }
        else{
            biten_gorev.tamamlanma_tarihi = null;
            finn_mesgul = true;
            finn.className = "finn-hasar";
            balon_sec("geri-alma");
        }
        balon_sayac = setTimeout(() => {
                finn.className = "finn-idle";
                balon.style.backgroundImage = "none";
                finn_mesgul = false;
            },2700);

        updatexpbar();
        kaydet();
        takvim_guncelle_ciz();
        info_guncelle();
    }
});

gorevliste.addEventListener("click",(e)=>{
    const button = e.target.closest("button");
    if(!button) return;

    const silinecek_li = button.parentElement;
    const id = silinecek_li.dataset.id;
    const silinecek_index = tasks.findIndex(t=> t.id === id);
    if(balon_sayac){
        clearTimeout(balon_sayac);
    }
    if(silinecek_index > -1){
        tasks.splice(silinecek_index,1);
        silinecek_li.remove();
        finn_mesgul = true;
        balon_sec("silme");
        balon_sayac = setTimeout(()=>{
            finn_mesgul = false;
            balon.style.backgroundImage = "none";
        },2700);
        kaydet();
        updatexpbar();
        takvim_guncelle_ciz();
        info_guncelle();
    }
});

play_btn.addEventListener("click",() =>{
    muzik_oynat();
});

pause_btn.addEventListener("click",()=>{
    muzik_durdur();
});

next_btn.addEventListener("click",()=>{
    siradaki_muzik();
});

prev_btn.addEventListener("click",()=>{
    onceki_muzik();
});

gorevcheck.addEventListener("click",()=>{
    gunluk_gorev_p.classList.toggle("tamamlandi");

    localStorage.setItem("oneri_check",gorevcheck.checked);

    if(balon_sayac){
        clearTimeout(balon_sayac);
    }

    if(gorevcheck.checked){
        finn_mesgul = true;
        finn.className = "finn-saldir";
        balon_sec("basari");
    }
    else{
        finn_mesgul = true;
        finn.className = "finn-hasar";
        balon_sec("geri-alma");
    }
    balon_sayac = setTimeout(()=>{
        finn_mesgul = false;
        balon.style.backgroundImage = "none";
        finn.className = "finn-idle";
    },2700)
});

onceki_ay_buton.addEventListener("click",()=>{
    onceki_aya_gec();
});

sonraki_ay_buton.addEventListener("click",()=>{
    sonraki_aya_gec();
})

ay_isim.addEventListener("click",()=>{
    bu_aya_don();
})

const tamamlanan_gunler_yukle = () => {
    const kayitligunler = localStorage.getItem("tamamlanan_gunler");
    if(!kayitligunler){
        return;
    }

    const tamamlanan_gunler = JSON.parse(kayitligunler);
    tamamlanan_gunler.forEach(gun => {
        gorev_yapilan_gunler.push(gun);
    })
}

const yukle = () => {
    const kayitligorevler  = localStorage.getItem("gorevler");
    if(!kayitligorevler) return;

    const gorevler = JSON.parse(kayitligorevler);
    gorevler.forEach(gorev => {
        tasks.push(gorev);

        const yeni_li = document.createElement("li");
        yeni_li.classList.add("elemanlar");
        if(gorev.tamamlandi){
            yeni_li.classList.add("tamamlandi")
        };
        yeni_li.dataset.id = gorev.id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = gorev.tamamlandi;

        const span = document.createElement("span");
        span.classList.add("span");
        span.textContent = gorev.metin;

        const deletebtn = document.createElement("button");
        deletebtn.innerHTML = `<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"> <path d="M16 2v4h6v2h-2v14H4V8H2V6h6V2h8zm-2 2h-4v2h4V4zm0 4H6v12h12V8h-4zm-5 2h2v8H9v-8zm6 0h-2v8h2v-8z" fill="currentColor"/> </svg>`;
        deletebtn.classList.add("delete-btn");

        yeni_li.appendChild(checkbox);
        yeni_li.appendChild(span);
        yeni_li.appendChild(deletebtn);

        gorevliste.appendChild(yeni_li);
    });
}

const takvim_sifirla = () => { 
    takvim.replaceChildren();
}

document.addEventListener("DOMContentLoaded",() => {
    tamamlanan_gunler_yukle();
    yukle();
    takvim_ciz();
    updatexpbar();
    hareket_dinle();
    info_guncelle();
    gunluk_gorev_onerici();
});


