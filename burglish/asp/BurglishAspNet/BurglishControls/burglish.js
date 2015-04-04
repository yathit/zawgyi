// Version ==

var version="1.4.3.080320";

// CSS setting
// We define styling hardcoded instead of css styling, so that user do not need to added our
// component styling.
var class_tips = ' style="background-color: #00FFCC; padding:1px; border: #87CEFA solid 1px; font:13px/1.6em Zawgyi-One,Arial,Verdana,Sans-Serif;" ';
var class_colon = ' style="float:left; background-color: #d7eaf9; padding:1px; min-width:150; border: #87CEFA solid 1px;" ';
var class_coloff = ' style="float:left; background-color: #e5ecf9; padding:1px; min-width:150; border: #e5ecf9 solid 1px;" ';
var class_inline = ' style="text-align:left !important; float:left !important; position:absolute !important; background-color: #e5ecf9;' +
	'min-width:150;width:50%; max-height:450; min-height:20; overflow:hidden; padding:3px; visibility:hidden; cursor:pointer;' +
	'font:13px/1.6em Zawgyi-One,Arial,Verdana,Sans-Serif; z-index:100;" ';
var class_on = ' style="background-color:#87CEFA; min-width:150;" ';
var class_off = ' style="background-color:#e5ecf9; min-width:150;" ';
var class_bchlist = ' style="float:left; padding:1px 8px 1px 8px; margin:1px 4px 1px 4px; background-color: #101010; color:Yellow;' +
	'font:15px/1.8em Zawgyi-One,Arial,Verdana,Sans-Serif; cursor:pointer; width:90%;display:none;" ';
function getClassOnOff(className)
{
    if (className == 'on') return class_on;
    else if (className == 'colon') return class_colon;
    else if (className == 'coloff') return class_coloff;
    else return class_off;
}

// Data Start >>

var _b={
"v":[{"m":"yn[n]?","r":{"yn":["$1င္","$1င္း"],"ynn":["$1င္း"]}},{"m":"ye?","r":{"y":["$1ိုင္","$1ိုင္း","$1ိုင့္"],"ye":["$1ိုင္း","$1ိုင္","$1ိုင့္"]}},{"m":"u[uh]?","r":{"u":["$1ူ","$1ု","$1ူ႕"],"uh":["$1ူ႕"],"uu":["$1ူး"]}},{"m":"u[tz]","r":{"ut":["$1ြတ္","$1ြပ္","ေ$1ာတ္","$1ြဋ္"],"uz":["$1ြဇ္","ေ$1ာဇ္"]}},{"m":"u[mn]","r":{"un":["$1ြန္","$1ြမ္","$1ြံ","$1ြဏ္"],"um":["$1ြမ္","$1ြမ္း"]}},{"m":"u[mn][mnt]","r":{"unn":["$1ြန္း","$1ြမ္း","$1န္း","$1ြဏ္း"],"umm":["$1ြမ္း","$1ြမ္"],"unt":["$1ြန္႕","$1ြံ႕","$1ြမ့္"],"umt":["$1ြမ့္"]}},{"m":"r[rh]?","r":{"r":["$1ာ","$1ား","$1ာ့"],"rh":["$1ာ့"],"rr":["$1ား"]}},{"m":"out?","r":{"ou":["$1ိုး","$1ို"],"out":["ေ$1ာက္","ေ$1ာတ္","ေ$1ာဂ္"]}},{"m":"oth","r":{"oth":["$1ို႕"]}},{"m":"oo[nm][th]","r":{"oon[th]":["$1ြန့္","$1ြမ့္"],"oom[th]":["$1ြမ့္","$1ြန့္"]}},{"m":"oo[dtnmz]","r":{"ood":["$1ြဒ္","$1ြတ္"],"oot":["$1ြတ္","$1ြပ္"],"oon":["$1ြန္း","$1ြန္","$1ြမ္း","$1ြမ္"],"oom":["$1ြမ္း","$1ြမ္"],"ooz":["$1ြဇ္","ေ$1ာဇ္"]}},{"m":"oo?","r":{"o":["$1ို","$1ိုး","$1ိုရ္","$1ိုယ္","$1ိုဠ္","$1ိုဟ္"],"oo":["$1ိုး","$1ူး"]}},{"m":"one","r":{"one":["$1ုန္း","$1ုံး","$1ုမ္း","$1ုဥ္း","$1ုန္","$1ုံ","$1ုမ္"]}},{"m":"ont?","r":{"on":["$1ြန္","$1ြံ","$1ြဏ္"],"ont":["$1ြန္႔","$1ြံ႕","$1ြမ့္","$1ုန္႕"]}},{"m":"oh[mn]h?","r":{"oh[mn]":["$1ုန္း","$1ုမ္း"],"oh[mn]h":["$1ုန္႕","$1ုမ့္"]}},{"m":"oe[th]?","r":{"oe":["$1ိုး"],"oe[th]":["$1ို႕"]}},{"m":"oan[hnt]?","r":{"oan":["$1ုန္","$1ုမ္","$1ံု","$1ုဏ္","$1ုဥ္","$1ုလ္"],"oann":["$1ုန္း","$1ုမ္း","$1ံုး","$1ုဥ္း"],"oan[ht]":["$1ုန္႕","$1ုမ့္","$1ံု႔","$1ုဥ့္"]}},{"m":"oa","r":{"oa":["$1ြာ"]}},{"m":"o[rl]","r":{"ol":["$1ိုလ္","ေ$1ာ","$1ိုဠ္"],"or":["ေ$1ာ္","ေ$1ာ"]}},{"m":"or[th]","r":{"or[th]":["ေ$1ာ့"]}},{"m":"o[hptyi]","r":{"o[hpt]":["$1ို႕","ေ$1ာ့","$1ိုယ့္"],"o[iy]":["$1ြဳင္"]}},{"m":"oa[tkdpv]","r":{"oat":["$1ုတ္","$1ုပ္","$1ုက္","$1ုစ္","$1ုဇ္","$1ုဂ္","$1ုဋ္"],"oak":["$1ုက္"],"oad":["$1ုဒ္","$1ုဎ္","$1ုသ္"],"oap":["$1ုပ္","$1ုတ္"],"oav":["$1ုဗ္"]}},{"m":"o[tkdpv]","r":{"ot":["ေ$1ာ့","$1ုတ္","$1ုပ္","$1ုက္","$1ုစ္","$1ုဇ္","$1ုဂ္","$1ုဋ္"],"ok":["$1ုက္"],"od":["$1ုဒ္","$1ုဎ္"],"op":["$1ုပ္","$1ုတ္"],"ov":["$1ုဗ္"]}},{"m":"o[tkdpv]e","r":{"ote":["$1ုတ္","$1ုပ္","$1ုက္","$1ုစ္","$1ုဇ္","$1ုဂ္","$1ုသ္","$1ုဋ္"],"oke":["$1ုက္"],"ode":["$1ုဒ္","$1ုဎ္"],"ope":["$1ုပ္","$1ုတ္"],"ove":["$1ုဗ္"]}},{"m":"in[ngt]?","r":{"in":["$1င္","$1င္း","$1ဥ္","ေ$1န္","$1ဥ္း"],"in[ng]":["$1င္း","$1ဥ္း"],"int":["$1င့္","$1ဥ့္"]}},{"m":"i[ih]?","r":{"i":["$1ိ","$1ီ","$1ည္","$1ည္း","$1ည့္"],"ih":["$1ည့္"],"ii":["$1ီး","$1ည္း","$1ည့္"]}},{"m":"i[dktsz]e?","r":{"i[kts]":["$1စ္","$1တ္","ေ$1တ္","ေ$1က္","$1ဋ္","ေ$1စ္"],"iz":["$1ဇ္","$1ာဇ္"],"id":["$1စ္"],"i[kt]e":["$1ိုက္"],"ide":["$1ိုဒ္"],"is":["$1စ္","ေ$1စ္"]}},{"m":"g","r":{"g":["ေ$1ာင္","ေ$1ာင္း"]}},{"m":"f","r":{"f":["$1္"]}},{"m":"en","r":{"en":["$1ဲန္း","$1ဲန္","$1န္"]}},{"m":"e[ilt]","r":{"ei":["ေ$1း","$1ဲ","$1ယ္","ေ$1","$1ည္း","$1ည္"],"el":["$1ဲ","$1ယ္","$1ည္","$1ည္း","$1ဲ့","$1ည့္"],"et":["$1က္","$1တ္","$1ပ္"]}},{"m":"e[il]h","r":{"eih":["ေ$1့","$1ဲ့","$1ယ့္","$1ည့္"],"elh":["$1ဲ့","$1ယ့္","$1ည့္"]}},{"m":"e[eh]?","r":{"e":["$1ီ","$1ဲ","$1ည္","$1ယ္","ေ$1","$1ည့္","$1ဲ့"],"eh":["$1ဲ့","$1ည့္","ေ$1့","$1ဲ","$1ည္"], "ee":["$1ီး","$1ည္း"]}},{"m":"[ae][ck]","r":{"a[ck]":["$1က္"],"e[ck]":["$1က္"]}},{"m":"[ae]ck","r":{"ack":["$1က္"],"eck":["$1က္"]}},{"m":"aut?","r":{"au":["ေ$1ာ"],"aut":["ေ$1ာက္","ေ$1ာတ္"]}},{"m":"aw[wn]?","r":{"aw":["ေ$1ာ","ေ$1ာ္","ေ$1ာ့","ေ$1ာဝ္"],"aww":["ေ$1ာ"],"awn":["ေ$1ာန္"]}},{"m":"ath","r":{"ath":["$1သ္"]}},{"m":"arnn?","r":{"arn":["$1ာန္","$1ာဏ္","$1ာဟ္"],"arnn":["$1ာန္း","$1ာဏ္း"]}},{"m":"arl","r":{"arl":["$1ာယ္","$1ာည္"]}},{"m":"ai","r":{"ai":["$1ိုင္း","$1ိုင္","$1ိုဏ္း","$1ိုင့္","ေ$1"]}},{"m":"aeh?","r":{"ae":["$1ယ္","$1ဲ","ေ$1","$1ည္","ေ$1း"],"aeh":["ေ$1့","$1ည့္","$1ဲ့"]}},{"m":"ay[eyth]?","r":{"ay":["ေ$1","$1ည္","ေ$1း","ေ$1့","$1ည္း"],"ay[ey]":["ေ$1း","$1ည္း"],"ay[th]":["ေ$1့","$1ည့္"]}},{"m":"ey[yth]?","r":{"ey":["ေ$1","$1ည္","ေ$1း","ေ$1့","$1ည္း"],"ey[y]":["ေ$1း","$1ည္း"],"ey[th]":["ေ$1့","$1ည့္"]}},{"m":"aw[th]","r":{"aw[th]":["ေ$1ာ့"]}},{"m":"an[nt]?","r":{"an":["$1န္","$1ံ","$1မ္","$1ဏ္","$1လ္"],"ann":["$1န္း","$1မ္း","$1ဏ္း"],"ant":["$1န္႕","$1ံ့","$1မ့္"]}},{"m":"amm?","r":{"am":["$1မ္","$1မ္း","$1န္","$1ံ"],"amm":["$1မ္း"]}},{"m":"alh","r":{"alh":["$1ယ့္","$1ဲ့","$1ည့္","$1ဲ","$1ည္"]}},{"m":"a[bdglptv]","r":{"ab":["$1ဘ္"],"ad":["$1ဒ္","$1ဎ္"],"ag":["$1ဂ္"],"av":["$1ဗ္"],"ap":["$1ပ္"],"al":["$1ယ္","$1ဲ","$1ည္","$1ည္း","$1ဲ့","$1ည့္","$1လ္"],"at":["$1တ္","$1က္","$1ပ္","$1ဟ္","$1ဋ္"]}},{"m":"ai[dkptv]","r":{"ait":["$1ိတ္","$1ိပ္","$1ိဇ္","$1ိစ္","$1ိက္"],"aik":["$1ိက္","$1ိတ္"],"aip":["$1ိပ္"],"aiv":["$1ိဗ္"],"aid":["$1ိဒ္"]}},{"m":"a[dkptv]e","r":{"ate":["$1ိတ္","$1ိပ္","$1ိဇ္","$1ိစ္","$1ိက္","$1ိဋ္","$1ိသ္"],"ake":["$1ိက္","$1ိတ္"],"ape":["$1ိပ္"],"ave":["$1ိဗ္"],"ade":["$1ိဒ္"]}},{"m":"[ao]un","r":{"[ao]un":["ေ$1ာင္","ေ$1ာင္း"],"[ao]un":["ေ$1ာင့္"]}},{"m":"aun[gth]","r":{"aun[g]":["ေ$1ာင္","ေ$1ာင္း"],"aun[th]":["ေ$1ာင့္"]}},{"m":"oun[gth]","r":{"oun[g]":["ေ$1ာင္","ေ$1ာင္း"],"oun[th]":["ေ$1ာင့္"]}},{"m":"[aeu]r","r":{"[aeu]r":["$1ာ","$1ား","$1ာ့"]}},{"m":"[aeu]rr","r":{"[aeu]rr":["$1ား"]}},{"m":"[aeu]rh","r":{"[aeu]rh":["$1ာ့"]}},{"m":"[aeu]r[btkd]","r":{"[aeu]rt":["$1ာတ္","$1ာက္","$1ာဟ္"],"[aeu]rk":["$1ာတ္","$1ာက္","$1ာဟ္"],"[aeu]rd":["$1ာဒ္","$1ာ႒္"],"[aeu]rb":["$1ာဘ္"]}},{"m":"[ae]it","r":{"[ae]it":["$1ိတ္","$1ိပ္","$1ိက္","$1ိဋ္","$1ိသ္"]}},{"m":"ain[nth]?","r":{"ain":["$1ိန္","$1ိမ္","$1ႎ","$1ိင္","$1ိဥ္","$1ိဏ္","$1ိလ္"],"ainn":["$1ိန္း","$1ိမ္း","$1ိဏ္း"],"ain[th]":["$1ိန္႕","$1ိမ့္"]}},{"m":"ein[nth]?","r":{"ein":["$1ိန္","$1ိမ္","$1ႎ","$1ိင္","$1ိဥ္","$1ိဏ္","$1ိလ္"],"einn":["$1ိန္း","$1ိမ္း","$1ိဏ္း"],"ein[th]":["$1ိန္႕","$1ိမ့္"]}},{"m":"[ae]`","r":{"[ae]`":["$1ဲ့","$1ဲ"]}},{"m":"(?:aing|ine)","r":{"aing":["$1ိုင္","$1ိုင္း"],"ine":["$1ိုင္","$1ိုင္း","$1ိုဏ္း"]}},{"m":"a","r":{"a":["$1","$1ာ့"]}},{"m":"`","r":{"`":["$1ဲ့","$1ဲ"]}}]
,"c":[{"kyw":["ၾကြ","ကြၽ"],"khw":["ခြ"],"htw":["ထြ"],"phw":["ဖြ"],"phy":["ျဖ","ဖ်"],"thw":["သြ"],"nhy":["ညႇ","ျငႇ","ဥႇ"],"chw":["ခြၽ","ျခြ"],"hmy":["မွ်","ျမွ"],"mhy":["မွ်","ျမွ"],"hlw":["လႊ"],"lhw":["လႊ"],"hmw":["မႊ","ျမႊ"],"mhw":["မႊ","ျမႊ"],"shw":["ရႊ"],"nhg":["ငွ"],"ngh":["ငွ"],"nhw":["ႏႊ"],"ngw":["ငြ"],"hnw":["ႏႊ"],"hly":["လွ်","လ်"],"lhy":["လွ်","လ်"],"htt":["ဌ"],"hdd":["ဎ"]},{"kh":["ခ"],"gg":["ဃ"],"gh":["ဃ"],"ng":["င"],"ny":["ည","ျင","ဉ"],"ht":["ထ","ဌ","႒"],"hs":["ဆ"],"ss":["ဆ"],"ph":["ဖ"],"th":["သ"],"ch":["ခ်","ျခ"],"gy":["ဂ်","ျဂ","ၾက"],"sh":["ရွ","လွ်","သွ်"],"my":["ျမ","မ်"],"ky":["က်","ၾက"],"py":["ျပ","ပ်"],"mh":["မွ"],"hm":["မွ"],"by":["ဗ်","ျဗ","ဘ်"],"kw":["ကြ"],"tw":["တြ"],"nw":["ႏြ"],"gw":["ဂြ"],"sw":["စြ","ဆြ"],"pw":["ပြ"],"mw":["မြ","ျမြ"],"yw":["ရြ","ယြ"],"lw":["လြ","လႊ"],"nh":["ငွ","ႏွ","ဏွ"],"hn":["ႏွ","ဏွ"],"lh":["လွ","ဠွ"],"ly":["လ်","လွ်"],"hl":["လွ","ဠွ"],"bw":["ဘြ","ဗြ","ပြ"],"wh":["ဝွ"],"dw":["ဒြ","ျဒ"],"dr":["ဒြ","ျဒ"],"tr":["တ်","ၾတ"],"tt":["ဋ"],"ty":["တ်","ၾတ"],"zz":["စ်"],"zh":["စ်"],"ll":["ဠ"],"nn":["ဏ"],"dd":["ဓ"],"hd":["ဍ","ဎ"],"yh":["ယွ"],"sy":["ၾဆ"],"fy":["ျဖ","ဖ်"],"fw":["ဖြ","ဘြ"],"yh":["ယ","ယ်"],"yy":["ယ","ယ်"],"hw":["ဟြ"]},{"k":["က","ခ"],"c":["က"],"q":["က"],"g":["ဂ","က","ဃ"],"s":["စ","ဆ"],"x":["ဆ","စ"],"z":["ဇ","စ်"],"t":["တ","ဋ"],"d":["ဒ","ဓ","တ","ဍ","ဎ"],"n":["န","ဏ"],"p":["ပ"],"f":["ဖ"],"b":["ဘ","ဗ","ပ"],"m":["မ"],"y":["ရ","ယ","လ်","ယ်"],"r":["ရ","ယ","လ်"],"l":["လ","ဠ"],"w":["ဝ"],"h":["ဟ"],"j":["ဂ်","ျဂ"],"v":["ဗ","ဘ"],"a":["အ"],"e":["အ"],"i":["အ"],"o":["အ"],"u":["အ"]}]
,"a":[{"m":"[ခဂငဒပဝ၀][ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇႇွုူႈႉြႊ]?ာ္?","r":{"([ခဂငဒပဝ၀][ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇႇွုူႈႉြႊ]?)ာ္":"$1ၚ","([ခဂငဒပဝ၀][ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇႇွုူႈႉြႊ]?)ာ":"$1ါ"},"t":true},{"m":"[ျၾ][ခဂငဒပဝ၀].{0,3}[ၚါ]","r":{"([ျၾ][ခဂငဒပဝ၀].{0,3})ၚ":"$1ာ္","([ျၾ][ခဂငဒပဝ၀].{0,3})ါ":"$1ာ"},"t":true},{"m":"န[ံိႎဲ]?[ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇွုူႈႉြႊ]","r":{"န([ံိႎဲ]?[ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇွုူႈႉြႊ])":"ႏ$1"},"t":true},{"m":"[ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇွုူႈႉြႊန်ဳဴ].?[့႔]","r":{"([ၠၡၢၣၥၧၨၩၬၭၰၲၱၳၵၶၷၸၹၺၻၼႅႇွုူႈႉြႊန်ဳဴ].?)[့႔]":"$1႕"}},{"m":"[ဍဋစ် ညျၾ].{1,3}[ုူ]","r":{"([ဍဋညျၾ].{1,3})ု":"$1ဳ","([ဍဋညျၾ].{1,3})ူ":"$1ဴ"},"t":true},{"m":"[ံိႎဲ]?[ုူ]","r":{"ွ([ံိႎဲ]?)ု":"$1ႈ","ွ([ံိႎဲ]?)ူ":"$1ႉ"}},{"m":"[ၠၡၢၣၥၧၨၩၬၭၰၲၱၴၳၵၶၷၸၹၺၻၼွြႊည႒ဠ ်][ံိႎဲ]?ု","r":{"([ၠၡၢၣၥၧၨၩၬၭၰၲၱၴၳၵၶၷၸၹၺၻၼွြႊည႒ဠ ်][ံိႎဲ]?)ု":"$1ဳ"}},{"m":"[ၠၡၢၣၥၧၨၩၬၭၰၲၱၴၳၵၶၷၸၹၺၻၼွြႊည႒ဠ ်][ံိႎဲ]?ူ","r":{"([ၠၡၢၣၥၧၨၩၬၭၰၲၱၴၳၵၶၷၸၹၺၻၼွြႊည႒ဠ ်][ံိႎဲ]?)ူ":"$1ဴ"}},{"m":"ရ[ံိႎဲ]?[ုူႈႉ]","r":{"ရ([ံိႎဲ]?[ုူႈႉ])":"႐$1"}},{"m":"[ကဃဆဏတထဘယလသဟ][ဲံိီ]?ၲ","r":{"([ကဃဆဏတထဘယလသဟ][ဲံိီ]?)ၲ":"$1ၱ"},p:["ၲ","ၱ"],"t":true},{"m":"[ကဃဆဏတထဘယလသဟ][ဲံိီ]?ၴ","r":{"([ကဃဆဏတထဘယလသဟ][ဲံိီ]?)ၴ":"$1ၱ"},p:["ၴ","ၱ"],"t":true},{"m":"ွ[ိႎ်ဲၽ]?ွ","r":{"ွ([ိႎ်ဲၽ]?)ွ":"ွ$1"}},{"m":"ြွ|ွြ|ႊွ","r":{"ြွ|ွြ|ႊွ":"ႊ"}},{"m":"်ြ","r":{"်ြ":"ြၽ"}},{"m":"ွႇ[ိီ်ၽ]ြြ","r":{"[ွႇ]([ိီ်ၽ]?)ြ":"ႊ$1"}},{"m":"်ွ","r":{"်ွ":"ွ်"}},{"m":"[ျၾ].{0,2}ွ","r":{"([ျၾ].{0,2})ွ":"$1ႇ"}},{"m":"[ဝြႊ].{0,2}ြ","r":{"([ဝြႊ].{0,2})ြ":"$1"}},{"m":"[ဥ][ုဳ]","r":{"([ဥ])[ုဳ]":"$1"}},{"m":"ၤ.{0,2}[ိီ]","r":{"ၤ(.{0,2})ိ":"ႋ$1","ၤ(.{0,2})ီ":"ႌ$1"},"t":true},{"m":"ာ႕","r":{"ာ႕":"ာ့"}},{"m":"ၾ[ကဃဆဏတထဘယလသဟ][ံိႎဲ]?ြ","r":{"ၾ([ကဃဆဏတထဘယလသဟ][ံိႎဲ]?ြ)":"ႂ$1"}}]
,"p":[["အု","ဥ"],["အိ(?![ု])", "ဣ"],["ေအာ(?![့္])","ဩ"]]
,"d":[["တစ္", "ႏွစ္","သံုး","ေလး","ငါး","ေျခာက္","ခုႏွစ္","ရွစ္","ကိုး"],[["ဆယ္","ဆယ့္"],["ရာ","ရာ့"],["ေထာင္","ေထာင့္"],["ေသာင္း","ေသာင္း"],["သိန္း","သိန္း"],["သန္း","သန္း"],["ကုေဋ","ကုေဋ"]]]
,"s":[["kyarr","က်္ား","$","",-1],["nhite","၌","",""],["hnite","၌","",""],["shat","ယွက္","$","",-1],["nyin","ညာဥ္","$","",-1],["shin","ယွဥ္","$","",-1],["kyar","က်္ာ","$","",-1],["yway","၍","",""],["umm","အမ္","",""],["imm","အင္းမ္...","",""],["yin","ယာဥ္","","",-1],["yin","ယ်ာဥ္","","",-1],["ywe","၍","",""],["d","ဒီ","",""],["u","ယူ","",""],["own","အံုး","",""],["it","ဧတ္","",""],["el","ဧည့္","",""],["ei","ဣ","",""],["or","ဪ","",""],["ei","၏","",""],["ei","ဤ","",""],["oo","ဥ","",""],["ah","အ","",""],["aw","ဪ","",""],["ay","ဧ","",""],["ag","ေအာင္","",""],["oo","ဦး","",""],["oh","အိုး","",""],["r","အာ","",""],["ae","အဲ","",""],["ei","အိ","",""],["um","အမ္","",""],[".","။","",""],[",","၊","",""],[",","ျပီး","",""],[".","ျပီ","",""],["4","၎","-1","",-1],[".","ဤ","",""],[".","သည္","",""],[".","၏","",""],[",","၌","",""],[",","၍","",""],[",","ႏွင့္","$",""],["f","္","","--္"],["b","ျပီ","",""],["o","အို","",""],["p","ျပီ","",""],["e","ဤ","",""],["a","အ","",""],["a","ေအ","","",-1],["u","ဥ","",""],["u","ဦး","",""],["h","့","","--့"],[";","း","",""],["eu","အူ","",""],["u","အူ","",""],["u","အု","",""],["a","အစ္","","",-1]]
};

// character list originally by SaturnGod, some are modified
var _chlist=['က','ခ','ဂ','ဃ','င','စ','ဆ','ဇ','ဈ','ည','ဋ','ဌ','ဍ','ဎ','ဏ','တ','ထ','ဒ','ဓ','န','ပ','ဖ','ဗ','ဘ','မ','ယ','ရ','လ','ဝ','သ','ဟ','ဠ','အ','---ၠ','--ၡ','--ၢ','---ၣ','--ၥ','---ၧ','--ၨ','--ၩ','--ၬ','---ၭ','---ၰ','---ၲ','---ၱ','---ၴ','---ၳ','--ၵ','--ၶ','--ၷ','--ၸ','--ၹ','--ၺ','---ၻ','--ၼ','--ႅ','၀','၁','၂','၃','၄','၅','၆','၇','၈','၉','ေ','--ိ','--ီ','--္','--ၤ','-ာ','-ါ','-ၚ','--ဲ','--ြ','--ႊ','--ံ','-း','-်','-ၽ','ျ--','ၾ---','ၿ--','ႀ---','ႁ--','ႂ---','ႃ--','ႄ---','--့','--႔','--႕','-၊','-။','ႏ','႐','႒','ဥ','ဧ','၏','ႆ','၍','၌','ဤ','--ု','--ူ','-ဳ','-ဴ','--ႈ','--ႉ','--ွ','--ႇ','--ႋ','--ႌ','--ႎ','--ႍ','ဩ','ဪ','ဉ','ၫ','ၪ','ဦ','၎','ဣ','႗','ၮ','ၯ','႑','---႖'];

// << Data End 

// Code Start >>

// Main Data Query Whenever you type
var _o = new Object();
function dataQuery( obj ){
	_o.x = obj.id;
	var query = _o[_o.x]["query"];
	//if no data, no need to show menu
	if( !query ) {
		if( _id( "burmese" ) && !_o[_o.x]["self"] ) _id("burmese").value = "";
		_hide( _o.x  + "drop");
		return ;
	}
	
	//get menu from dictionary
	var data=_getMenuData( obj, query); var dlen = data.length;
	//get Numbers
	data = _getNumbers (obj, query, data);
    
    data = _getMenuEx(obj, query, data);
    data = _getMenuExUpd(obj, query, data);
	
	_o[_o.x]["noitem"]=data.length==0?(_o[_o.x]["noitem"]+1):0;
	//self.status = _o[_o.x]["noitem"];
	if(_o[_o.x]["noitem"]==0){_o[_o.x]["hist"]=[];_o[_o.x]["hist"][0]=data[0];}
	if(_o[_o.x]["noitem"]==2 && query.length>_o[_o.x]["noitem"]){ //if can't find in 2 char, force update it.
		var tmp=_o[_o.x]["query"];
		_o[_o.x]["query"]=_o[_o.x]["hist"][0][0];
		_o[_o.x]["list"]=[_o[_o.x]["hist"][0]];_o[_o.x]["count"]=1;
		_onMDown_(obj);
		_o[_o.x]["query"]=query.substring(query.length-_o[_o.x]["noitem"], query.length);
		_o[_o.x]["noitem"]=0;
	}
	
	if(!obj.useServer) _showMenu( obj, query, data );
};

// Reverse Regular Expression Pattern Generator ==
// # Support [] ? for now #
// # [] may appear twice #

var _bc = [];var _bcx={};var _bcb={};
function b2bc(){
    var _c=[]; //cache for sort a - z
    //all consonents
    for(var k=0; k<_b.c.length; k++){
        for(var idx in _b.c[k]){
            _c[_c.length] = [ idx, _b.c[k][idx] ];
        }
    };
    //special chars
    for(var k=0; k<_b.s.length; k++){
        _bc[_bc.length] = _b.s[k];
        if(_bcb[ _b.s[k][1] ]){
        	_bcb[ _b.s[k][1] ][ _bcb[ _b.s[k][1] ].length ] = _b.s[k][0];
        }else{
        	_bcb[ _b.s[k][1] ]=[ _b.s[k][0] ];
        }
    };
    //_c.sort();
   for(var k=0; k<_c.length; k++){
            var i = _b.v.length-1;
            while (i>=0) {
                for( var _x in _b.v[i].r ){
                    for( var i1=0; i1 < _c[k][1].length; i1++){
                        for(var n=0; n<_b.v[i].r[_x].length; n++){
                            var _r1 = (_c[k][0]=="a"?"":_c[k][0])+_x; //romanji
                            var _w = _b.v[i].r[_x][n].replace("$1",_c[k][1][i1]); //burmese
                            //if [] in the re
                            if( /\[[^\[\]]*\]/.test(_r1) ){
                                var _m1 = _r1.match(/\[[^\[\]]*\]/g);
                                //only one []
                                if(_m1.length==1){
                                    var _m2 = _m1[0].match(/\w/g);
                                    for (var i2=0; i2<_m2.length ; i2++){
                                        var _r2 = _r1.replace(_m1[0],_m2[i2]);
                                        _bc[_bc.length] = [ _r2, _w, "", ""];
                                        if(_bcb[_w]){
                                        	_bcb[_w][ _bcb[_w].length ] = _r2;
                                        }else{
                                        	_bcb[_w]=[_r2];
                                        }
                                    }
                                }else if(_m1.length==2){
                                    var _m2 = _m1[0].match(/\w/g);
                                    var _m3 = _m1[1].match(/\w/g);
                                    for (var i2=0; i2<_m2.length ; i2++){
                                        for (var i3=0; i3<_m3.length ; i3++){
                                            var _r2 = _r1.replace(_m1[0],_m2[i2]);
                                            _r2 = _r2.replace(_m1[1],_m3[i3]);
                                            _bc[_bc.length] = [ _r2, _w, "", ""];
                                            if(_bcb[_w]){
	                                        	_bcb[_w][ _bcb[_w].length ] = _r2;
	                                        }else{
	                                        	_bcb[_w]=[_r2];
	                                        }
                                        }
                                    }
                                }
                            }else{
                                if( /(\?)/.test(_r1) ){
                                    var _m1 = _r1.match(/(\w)(\?)/);
                                    var _r2 = _r1.replace(_m1[0], "");
                                    _bc[_bc.length] = [ _r2, _w, "", ""];
                                    _r2 = _r1.replace(_m1[0],_m1[1]);
                                    _bc[_bc.length] = [ _r2, _w, "", ""];
                                }else{
					                _bc[_bc.length] = [ _r1, _w, "", ""];
					                if(!_bcx[_r1.charAt(0)]) _bcx[_r1.charAt(0)] = _bc.length;
					                if(_bcb[_w]){
                                    	_bcb[_w][ _bcb[_w].length ] = _r1;
                                    }else{
                                    	_bcb[_w]=[_r1];
                                    }
					            }
					        }
                        }
                    }
                }
             i--;
            }
        }
};

//Burmese to Burglish routine
String.prototype.burglize =function(){
	var ret ="";
	var _s = this.bsplit();
	for(var i=0;i<_s.length; i++){
		if(_bcb[_s[i]]) { 
			ret+=_bcb[_s[i]][0];
		}else{
			ret +=_s[i];
		}
		var _n1 = _s[i<_s.length-1?i+1:i];
		var re = /[\n\s]/;
		ret += (re.test(_s[i]) || re.test(_n1) )?"":" ";
	}
	return ret;
};

//Main Generator for Burglish Menu Datas
function _getMenuEx(obj, query, data){
	var _r0;var _r1;var _r2; var _cons1;var _cons2;var _cons3;var _cons4;
	var help  = "" + query + "";
	_o[_o.x]["lower"]=(query.charCodeAt(0)>64 && query.charCodeAt(0)<91) ?true:false;
	//consonent main loop
	for(var k=0; k<_b.c.length; k++){
		//consonent group by char len loop
		for(var idx in _b.c[k]){
			//case insensitive consonent
			if(query==idx) query = query + "a";
			_r0 = eval( "/^" + idx  +"/i");
			//vowel only
			//test for particular consonent
			if ( _r0.test( query )){
				//consonent particles loop
				for( var i1=0; i1 < _b.c[k][idx].length; i1++){
					_cons1 = _b.c[k][idx][i1];
					//if patsints
					if(_o[_o.x]["lower"]){
						if(bord(_o[_o.x]["plChar"])!=4){//not nga that
							_cons1 = bLower(_b.c[k][idx][i1],_o[_o.x]["font"]);
						}
					}
					//put consonent or patsint consonent
					if(/^[aeiou]/i.test(query)) {
						query = query.replace(/^([aeiou])/i,"$1$1");
					}
					_cons2=query.replace(_r0,_cons1);

					var found = false;
					//vowels main loop
					for(var i = 0; i < _b.v.length ; i++ ) {
						var _r1 = eval( "/" + _b.v[i].m +"$/");
						//test for particular vowel
						if ( _r1.test( _cons2 )){
							//vowels each pattern loop
							for( var x in _b.v[i].r ){
								//vowels particles loop
								for(var n=0; n<_b.v[i].r[x].length; n++){
									_r1 = eval( "/" + "(.*)" + x  +"$/");
									_cons3 = _cons2.replace( _r1  , _b.v[i].r[x][n] );

									//auto correct
									if( !/\w/.test(_cons3) ){
										for(var l=0; l<_b.a.length; l++){
											 _r2 = eval( "/" + _b.a[l].m +"/");
											 if( _r2.test ( _cons3 ) ){
												 for( var y in _b.a[l].r ){
													_r2 = eval( "/" + y  +"/");
													_cons3 = _cons3.replace( _r2  , _b.a[l].r[y] );
												 }
											 }
										}

										var exist = false;
										for( var p=0; p<data.length;p++){
											if(data[p][1]=== _cons3) { exist = true; break; }
										} 
										if(!exist){
											if(_o[_o.x]["lower"]){
												//_cons4 = _o[_o.x]["plChar"] + _cons3;
												_cons4 = " --" + _cons3;
											}else{_cons4=_cons3; }
											data[data.length] = [ help, _cons3, "", _cons4 ] ;
											_o[_o.x]["list"][data.length-1] = eval(data[data.length-1]);
										}
										if(data.length>20) return data;
									}//auto correct test
									found = true;
								}// end vowels particles loop
							}//vowels each pattern loop
						}//test for particular vowel
					}//vowels main loop
				}//consonent particles loop
			}//test for particular consonent
		}//consonent group by char len loop
	}//consonent main loop
	return data;
}

//Burglish Menu Extra Items
function _getMenuExUpd(obj, query, data){
    //special pali characters
    for(var i2=0;i2<data.length;i2++){
        for(var i3=0;i3<_b.p.length;i3++){
            var re2 = eval("/" + _b.p[i3][0] + "/");
            if( re2.test(data[i2][1]) ){
                var _cons3 = data[i2][1].replace(re2,_b.p[i3][1]);
                var exist = false;
				for( var i4=0; i4<data.length;i4++){
					if(data[i4][1]=== _cons3) { exist = true; break; }
				} 
				if(!exist){
                    data[data.length] = [ data[i2][0], _cons3 ] ;
                }
            }
        }
    }
    // rearrange
    for(var i2=0;i2<data.length;i2++){
        var _item = data[i2];
        if(_item.length>=5){
            if(_item[4]==-1){
                data.splice(i2,1);
                data[data.length] = _item;
            }
        }
    }
    _o[_o.x]["list"] = data;
    return data;
}

//Burglish Menu Data for special case
function _getMenuData(obj, query){
	var found = false;
	var itemCount = 0;
	var data = [];
	var qtmp = query.addSlash();
	var isBur = _o[_o.x]["isburmese"]?1:0;

	var re = eval("/^"+qtmp+"/"); //startwith

    var hasharray = _b.s;
	for( var i = 0 ; i < hasharray.length; i++ ) {
		if(isDef(hasharray[i][2])){
			if(hasharray[i][2]=="$"){
				re = eval("/^"+qtmp+hasharray[i][2]+"/");
			}
		}
		if(re.test(hasharray[i][isBur])){
			if( itemCount < 10) {
				data[itemCount] = hasharray[i];
				_o[_o.x]["list"][itemCount] = eval( hasharray[i] ) ;
				itemCount++;
			} else{
				_o[_o.x]["prev"] = query;
				break;
			}
			found = true;
		}
		if( itemCount > 10 ) break;
	}
	return data;
}

//Burglish Menu for Number Generator
function _getNumbers(obj, query, data){
	if( !isNaN( query ) && !/[^\d]+/.test(query) && !_o["ignore"]) {
		var num=query.convertDigit();
		data[data.length] = [ query, num ] ;
		_o[_o.x]["list"][data.length-1] = eval(data[data.length-1]);

		var dig="";
		//all zero
		var az=true;
		var rev = query.reverse();
		var d=0;

		if(rev.length <= _b.d[1].length+1){
			for(var i=0;i<rev.length;i++){
				if(d>0)az=false;
				d = parseInt( rev.charAt(i) );
				if( i==0 && d>0) {
					dig = _b.d[0][d-1];
				}else if(d>0){
					dig = _b.d[0][d-1] + _b.d[1][i-1][az?0:1] + dig;
				}
			}
		}

		if(dig!=""){
			data[data.length] = [ query, dig, "", dig ] ;
			_o[_o.x]["list"][data.length-1] = eval(data[data.length-1]);
		}
	}
	return data;
}

//for test loading , not using now
var rawloading=false;
var rawTimerID=0;
var sobj;
var rawAjax;
function onRawTimer(){
	if(!rawloading){
		rawloading=true;
		var params=new Object();
		SendAjax(5,params,onRawData,"","data/mortho.txt",rawAjax);
		//SendAjax(5,params,onRawData,"","data/autosuggest.txt",rawAjax);
	}
};
//onRawTimer();

function onRawData(_res, result, _dat, params){
	if(_res == "OK"){
		rawloading = false;
		sobj = _dat;
		clearTimeout(rawTimerID);
		rawTimerID = setTimeout("onRawTimer()", 1000*60*60);
	}
};

function _getRawData(obj){
	if(!sobj) return false;
	var query=_o[_o.x]["query"];
	var ret = sobj.match(eval("/(?:\,)("+query+"[^\,]*?)(?:\,)/g"));if(!ret) return false;
	ret = ret.join("").replace(/\,(?!\,)/g,"").split(/\,+/).slice(0,9);
	if(ret.length>0){ 
		_o[_o.x]["list"]=ret;
		_o[_o.x]["count"]=ret.length;
		_showMenu( obj, query, ret );
	}else{
		_o[_o.x]["list"]=[];
		_o[_o.x]["count"]=0;
		_o[_o.x]["query"]="";
		_hide( _o.x + "drop" );
	}
	return ret;
};

var _tips=[
  'ဘယ္ညာArrow key ကိုသံုးျပီးColumnကိုေရြးပါ။'
, 'အေပၚေအာက္Arrow key ျဖင့္စာလံုးတစ္ခုစီေရြးသြားႏိုင္ပါသည္။'
, 'Enter ကီး Tab ကီးစသည္တို႕ျဖင့္ စာလံုးကို အတည္ျပဳႏိုင္ပါသည္။'
, '၀ မွ ၉ အထိ Shortcut ကီးမ်ားကိုသံုးပါ။'
, 'ပုဒ္ကေလးပုဒ္မအတြက္ , ႏွင့္ . ကိုသံုးပါ။'
, '"စ္က္" စသည့္တို႕ကိုရိုက္ခ်င္လွ်င္ sf, kf စသည္ျဖင့္ရိုက္ပါ။'
, 'ေအာက္ကျမစ္သပ္သပ္ရိုက္ခ်င္လွ်င္ h ျဖင့္ရိုက္ပါ။'
, 'ဝစ္စေပါက္သပ္သပ္ရိုက္ခ်င္လွ်င္ ; ျဖင့္ရိုက္ပါ။'
, 'ပတ္ဆင့္မ်ားကို ရိုက္ခ်င္လွ်င္ စာလံုးအၾကီးျဖင့္ရိုက္ပါ။ tak Ka thol - တကၠသိုလ္'
, 'ေမာင္ ကို mg, ေအာင္ ကို ag, ကာ ကို kr, ပါကို pr ျဖင့္ရိုက္ႏိုင္သည္။'
, 'ဉာဏ္ကို nyarn, ပါယ္ ကို parl စသည္ျဖင့္ရိုက္ပါ။'
, 'ျမန္မာစာလံုး မေရြးလိုပါက Esc ႏွိပ္ႏို္င္ပါသည္။'
];
function _getTip(){
    return _tips[Math.round(Math.random()*(_tips.length-1))];
}

//Burglish Menu Item Generator
function _showMenu( obj, query, data){
	var itemCount = 0;
	var dropdown = _id( _o.x + "drop" );
	var html = '<div>';
	if (_o[_o.x]["_tips"]) html+='<div id="help'+_o.x+ '"' + class_tips + '>'+_getTip()+'<\/div>';
	html +='<div id="col'+_o.x+'0" ' + class_colon + '>';
	if( data.length == 0 ) html = "&lt;No Items available>";
	for(var i = 0; i < data.length ; i++){
	    if(i % 10 == 0 && i > 9 && i!=data.length) {
	        html+='<\/div><div id="col'+_o.x+(i/10)+ '"' + class_coloff +'>';
	    }
		if( _o[_o.x]["isburmese"] ) {
			html += '<div id="item' + _o.x + i +  '" onmousedown="_onMDown_();" onmouseup="_onMUp_();" onmouseover="setFocus('+ i +');" onmouseout="this.className=\'off\';" > &nbsp;' + (i%10) + '. ' + data[i][0] + ' ' + data[i][1] + '</div>';
		}else if( _o[_o.x]["_bmenu"] ){
			if(obj.conv) data[i][1] = data[i][1].convertFont(obj.conv[0],obj.conv[1]);
			html += '<div id="item' + _o.x + i +  '" onmousedown="_onMDown_();" onmouseup="_onMUp_();" onmouseover="setFocus('+ i +');" onmouseout="this.className=\'off\';" > &nbsp;' + (i%10) + '. ' + data[i][0].replace( query , '<b>' + query + '</b>' ) + ' ' + (data[i][3]?data[i][3]:data[i][1]) + '</div>';
		}else if( _o[_o.x]["_suggest"] ) {
			html += '<div id="item' + _o.x + i +  '" onmousedown="_onMDown_();" onmouseup="_onMUp_();" onmouseover="setFocus('+ i +');" onmouseout="this.className=\'off\';" > &nbsp;' + (i%10) + '. ' + data[i].replace( query , '<b>' + query + '</b>' ) + '</div>';
		}
	}
	html+='<\/div><\/div>';
	dropdown.innerHTML =html;
	
	if( data.length >= 1 ){
		_show( _o.x + "drop");
		_o[_o.x]["curPos"] = -1;
	}
	_o[_o.x]["count"] = data.length;

	//move dropdown position
	if(!isIE){
		var _pos = _xy(_o.x);
		//screenHeight+scrollTop > txtTop + txtHeight + dropdownHeight
		var _top = _pos[1] - dropdown.offsetHeight - 2;
		var _top2=0;
		if(document.body.clientHeight+document.body.scrollTop > _id(_o.x).offsetTop + _id(_o.x).offsetHeight + dropdown.offsetHeight ){
			_top2 =_pos[1] + _id(_o.x).offsetHeight;
		}
		dropdown.style.left =_pos[0];
		dropdown.style.top =_top<0?_top2:_top;
	}
};

function _onKDown_(e){
	var obj = e.target?e.target:e.srcElement;
	_o.x = obj.id;	_o["ignore"] = false;
	var key =e.keyCode? e.keyCode : e.charCode;
	//self.status = key;
	
	_o.ctrl = e.ctrlKey || e.ctrl;
	_o.alt = e.altKey || e.altLeft;
	_o.shift = e.shiftKey || e.shift || e.shiftLeft;
	_o.flag = (_o.alt?1:0) | (_o.ctrl?2:0) | (_o.shift?4:0);
	_o.spchar = ( key>=112 && key<=123) || key<20 || (key>=37 && key<=40) || (key>=33 && key<=36) || key==45 || key==46;
	
	if( key==13 ) {
		if( _o.ctrl || (!_o[_o.x]["_bmenu"] && !_o[_o.x]["_suggest"] && !_o[_o.x]["_binput"]) ) { 
			//if(typeof(onSubmit)=="function"){ onSubmit(); return false; }; 
			if(_o[_o.x]["callback"]) { eval(_o[_o.x]["callback"])(e); return false; }
		}
		var ret = _o[_o.x]["count"]==0;
		if(!ret) { _onMDown_(obj); return false; }
		if(!_o[_o.x]["multiline"]){
			//if(typeof(onSubmit)=="function"){ onSubmit(); return false;}
			if(_o[_o.x]["callback"]){ eval(_o[_o.x]["callback"])(e);return false;}
		}
		return ret;
	}else if( key ==113) {	//F2 Key
		var chkbox = _id("chk"+obj.id+"_bmenu");
		chkbox.checked = !chkbox.checked;
		updateOptions(chkbox, obj.id, "_bmenu");
		return false;
	}else if( key == 38 && _o[_o.x]["count"] > 0 ) { //up key
		_o[_o.x]["curPos"] = _o[_o.x]["curPos"] - 1;
		setFocus( _o[_o.x]["curPos"] );
		return !_o[_o.x]["_bmenu"];
	}else if( key == 40 ) { //down key
		if( !_o[_o.x]["query"] ) return;
		if( _o[_o.x]["count"]==0 ){
			dataQuery(obj);
		}else if( _o[_o.x]["curPos"] < _o[_o.x]["count"]-1 ){
			_o[_o.x]["curPos"] = _o[_o.x]["curPos"] + 1;
			setFocus( _o[_o.x]["curPos"] );
		}
		return !_o[_o.x]["_bmenu"];
	}else if( key == 32 ){
		if( obj.useServer ){
			//alert("test");
			if( !_o[_o.x]["query"] ) return;
			//getListFromServer(obj);
		}else if( _o[_o.x]["toburmese"] ) {
			if( !_o[_o.x]["query"] ) return;
			if(_o[_o.x]["count"]>1){
				_o[_o.x]["curPos"] += 1;
				if( _o[_o.x]["curPos"] >= _o[_o.x]["count"] ) _o[_o.x]["curPos"] = 0;
				setFocus( _o[_o.x]["curPos"] );
			}else{
				_update( obj );
			}
			return false;
		}
	}else if( key == 191){ // what is this? :P

	}else if(key == 9){ //tab
		_update( obj );
		return false;
	}else if( key == 37 && _o[_o.x]["count"] > 10 && _o[_o.x]["curPos"]>-1){ //left arrow
	    _o[_o.x]["curPos"]=(_o[_o.x]["curPos"]>10?_o[_o.x]["curPos"]-10:0);
	    setFocus( _o[_o.x]["curPos"]);
	    return false;
	}else if( key == 39 && _o[_o.x]["count"] > 0 && _o[_o.x]["curPos"]>-1){ //right arrow
	    _o[_o.x]["curPos"]=(_o[_o.x]["curPos"]+10<_o[_o.x]["count"]?_o[_o.x]["curPos"]+10:_o[_o.x]["count"]-1);
	    setFocus( _o[_o.x]["curPos"]);
	    return false;
	}else if( key == 8) {
		if ( _o[_o.x]["query"].length > 0 ) {
			_o[_o.x]["query"] = _o[_o.x]["query"].substr(0,_o[_o.x]["query"].length-1);
			if(_o[_o.x]["_bmenu"]) dataQuery(obj);
			if(_o[_o.x]["_suggest"]) _getRawData(obj);
		}
	}else if( key == 46 ){
		//return false;
	}else if( key == 35 || key == 36 ){

	}else if( key >= 48 && key <= 57 ){ // 0..9
		if( /[^\d]+/.test(_o[_o.x]["query"]) ){ //_o[_o.x]["curPos"] > -1
			_o["ignore"] = true;
			_o[_o.x]["curPos"] = (_o[_o.x]["curPos"]>=10?_o[_o.x]["curPos"]-_o[_o.x]["curPos"]%10:0) + key - 48;
			setFocus( _o[_o.x]["curPos"]);
			_update( obj );
			return false;
		}
	}else if( key == 27 ){ //Esc
		_o[_o.x]["query"] = "";
		_o[_o.x]["count"] = 0;
		_o[_o.x]["curPos"] = -1;
		_hide(_o.x + "drop");
		return false;
	}else if( key == 118 ) {//F7
		return false;
	}else if( key == 119 || (_o.flag==1 && key==78)) {//F8 or Alt-N
		var chkbox = _id("chk"+obj.id+"_binput");
		chkbox.checked = !chkbox.checked;
		updateOptions(chkbox, obj.id, "_binput");
		return false;
	} 
	if(isIE && (_o.flag & 3 == 3)) _onKPress_(e);
}

function _onKUp_(e){
	var obj = e.target?e.target:e.srcElement;
	storePosition(obj);
}

function _onKPress_(e){
	if(!e && window.event) e=event;
	var obj = e.target?e.target:e.srcElement;
	var key =e.keyCode? e.keyCode : e.charCode;
	var _char = unichr(key);
	if(((_o.flag==1) || (_o.flag==2) || _o.spchar || !_o.x ) && !_f[_dfont]["key"][str(_o.flag)+_char]) return;
	var re=/[\w;\.\,`]/;
	
	if(re.test(_char) && _o[_o.x]["_bmenu"] ){
		if(!_o["ignore"] && ( e.charCode!=0 || !isDef(e.charCode) )) {
			if(_o[_o.x]["query"]=="") { _o[_o.x]["spos"] = obj.selectionStart; }
			_o[_o.x]["query"] += "" + _char;
			dataQuery(obj);
		}
	}else if( _o[_o.x]["_binput"] ){ 
		//self.status += [e.keyCode,e.charCode,e.which];
		if(isIE){
			var _ch = ((_o.flag==3) ? getKey(bLower(unichr(getKey(key)))) :getKey(key));
			if(_f[_dfont]["key"][str(_o.flag)+_char]) {
			    _ch = _f[_dfont]["key"][str(_o.flag)+_char];
			    e.keyCode = null;
			    return _IEWrap(obj,_ch,"");
			}else{
			    e.keyCode = _ch;
			}
			return false;
		}else if(isValid(String(key))){
			var _g=obj.selectionStart; 
			var _ch = ((_o.flag==3)? bLower(unichr(getKey(key))):unichr(getKey(key)) );
			if(_f[_dfont]["key"][str(_o.flag)+_char]) _ch = _f[_dfont]["key"][str(_o.flag)+_char];
			return _mozWrap(obj,_ch,"");
		}
	}else if(_o[_o.x]["_suggest"] ){
		_o[_o.x]["query"] += _char;
		_getRawData(obj);
	}else if ( key >= 4096 && key <= 4096 + 256 ){
		if( _o[_o.x]["isburmese"] ) {
			_o[_o.x]["query"] += _char;
			dataQuery(obj);
		}
		if( _o[_o.x]["toburmese"] ) {
			_hide(_o.x + "drop");
		}
	}
	
	tmpkeypress();
}

function _update(obj){
	var _obj = _id(_o.x);
	var _s=_obj.value;
	var _replaced = false;
	var _erase = 0;
	if(!_o[_o.x]["query"]) return;
	var _res=_o[_o.x]["list"][_o[_o.x]["curPos"]]!=null ? _o[_o.x]["list"][_o[_o.x]["curPos"]] : _o[_o.x]["list"][0];
	var _prev=_o[_o.x]["prevW"];
	//only for patsints
	
	if(_o[_o.x]["lower"] && _prev.length > 1){
		if(bord(_prev.substr(_prev.length-1,1))==82 && bType(_res[1].charAt(0))!=3  ){
			var re=eval("/"+_prev+_o[_o.x]["query"] +"/gi");
			var lChar=_prev.substr(_prev.length-2,1);
			_prev=_prev.substr(0,_prev.length-2);

			_erase = 2;
			//move thaway htoe, yayit , yayit large to front
			var pcount=0;
			for(var i1=0;i1<_res[1].length;i1++){
				switch(bord(_res[1].charAt(i1))){
					case 77:case 97:case 98: _prev+=_res[1].charAt(i1);pcount++;_erase--;break;
				}
			}
			_res[1]=_res[1].substr(pcount,_res[1].length-pcount);

			_replaced = true;
			var fChar=_res[1].charAt(0);
			if(bord(lChar)==4){ //if nga that
				if(bord(fChar)==100) {
					_res[1] = fChar +_res[1].charAt(1) + "ၤ" + _res[1].substr(2,_res[1].length-1); //nga that on mingalar
				}else{
					_res[1] = fChar + "ၤ" + _res[1].substr(1,_res[1].length-1); //nga that on mingalar
				}
			}else if(bord(lChar)==14 && bord(fChar)==12){ 
				_res[1] = "႑" + _res[1].substr(1,_res[1].length-1);
			}else if(bord(lChar)==10 && bord(fChar)==43){ 
				_res[1] = "႗" + _res[1].substr(1,_res[1].length-1);
			}else if(bord(lChar)==12 && bord(fChar)==12){ 
				_res[1] = "ၮ" + _res[1].substr(1,_res[1].length-1);
			}else if(bord(lChar)==13 && bord(fChar)==12){
				_res[1] = "ၯ" + _res[1].substr(1,_res[1].length-1);
			}else if(bord(fChar)==29){ //large tha
				_res[1] = "ႆ" + _res[1].substr(1,_res[1].length-1);
			}else if(bord(fChar)==117){ //hta win bal, large
			}else if(bord(fChar)==31){ //la gyi
			}else{
				_prev+=lChar;
				_erase--;
			}

			var _res2 = _prev+ _res[1];
			//autocorrect
			for(var l=0; l<_b.a.length; l++){
				if(_b.a[l].t){//autocorrect only on some items
					 var rex = eval( "/" + _b.a[l].m +"/");
					 if( rex.test ( _res2 ) ){
						 for( var y in _b.a[l].r ){
							rex = eval( "/" + y  +"/");
							_res2 = _res2.replace( rex  , _b.a[l].r[y] );
							if(_b.a[l].p) _res[1] = _res[1].replace( _b.a[l].p[0], _b.a[l].p[1] ); //autoreplace previous character also
						 }
					 }
				}
			}
			
		}
	}
	if(!_res) {_o[_o.x]["query"] = "";return;}
	if(typeof(_res)!="string")_res=_res[1]; //if not array, no need to find it inside
	_res=_replaced?_res2:_res; //if patsints, use updated one
	_Wrap(_obj, _res, '',_o[_o.x]["query"].length+(_replaced?_erase+_prev.length:0), _o[_o.x]["noitem"]);
	
	_stoPrev(_o[_o.x]["query"], _res);
}

function _stoPrev(query,_res){
	var _prevW =_o[_o.x]["prevW"]=_res;
	if(bord(_prevW.substr(_prevW.length-1,1))==82){
		_o[_o.x]["plChar"] = _prevW.substr(_prevW.length-2,1);
	}
	_o[_o.x]["prev"]=query;
	_o[_o.x]["query"]="";
	_o[_o.x]["count"]=0;
	_o[_o.x]["curPos"]=-1;
	_hide(_o.x+"drop");
}

function _onMDown_(){
    var obj=_id(_o.x);
    var curPos=_o[_o.x]["curPos"];//==-1?0:_o[_o.x]["curPos"];
    if(curPos==-1 && _o[_o.x]["_bmenu"]) curPos=0; //if burglish menu and not selecting anything, just choose it first one.
	if( curPos>-1 && curPos < _o[_o.x]["count"] ) {
		var _item = _o[_o.x]["list"][curPos];
		if(typeof(_item)=="array") _item=_item[0];
		//_o[_o.x]["query"] = _item;
		_update(obj);
	}
}

function _onMUp_(){
	var obj = _id(_o.x);
	obj.focus();
	storePosition(obj);
}

function _onMOver_(obj){
    if(obj){
	    _o.x = obj.id;
	    obj.focus();
	}
}

function setFocus( index ){
	_o[_o.x]["curPos"] = index;
	if(index<0) { _hide(_o.x + "drop"); _o[_o.x]["curPos"]=-1;return false;}
	if ( _o[_o.x]["count"] < 1) return false;
	for(var i = 0; i < _o[_o.x]["count"]; i++ ){
		var itemX = _id("item"+ _o.x + i);
		itemX.className = i == index ? "on" : "off" ;
	}
	 for(var i =0; i < Math.ceil( _o[_o.x]["count"] / 10); i++){
        _id("col"+_o.x+i).className = i==Math.floor(_o[_o.x]["curPos"]/10)?"colon":"coloff";
    }
	_show(_o.x + "drop");
	//_o[_o.x].y['prevW1'] = _o[_o.x]["list"][index][1];
	return false;
}

function onBlur( obj ){
	if(_id(obj.id+"drop")) _hide( obj.id + "drop" );
	return false;
}

function onFocus( obj ){
	//return false;
}

function storePosition(_g) {
	if( document.selection ){ 
		var range = document.selection.createRange();
		_id(_g.id+"drop").style.top = range.offsetTop + _g._h;	
		_id(_g.id+"drop").style.left = range.offsetLeft;
	}
};

function writeTextbox( _g ){
	if(!_g.tag) return;
	_id(_g.tag).innerHTML = '<textarea style="height:'+(_g.rows?_g.rows*30:30)+';" rows="'+(_g.rows?_g.rows:1)+'" id="'+_g.id+ '"' + getClassOnOff(_g.className)+' autocomplete="off" ' +'onkeydown="return _onKDown_(event);"'+(isIE?'onkeypress="_onKPress_(event);"':'')+'onkeyup="_onKUp_(event);"'+'onmouseup="_onKUp_(event);"'+ 'onblur="onBlur(this);"'+'onfocus="onFocus(this);">' +'</textarea>';
	document.body.innerHTML += '<span ' + class_inline + ' id="'+_g.id+'drop"'+'>'+'</span>';
}

function attachTextbox( _g ){
	var obj=_id(_g.id);
	var _parNode =  obj.parentNode;
	var _par = _parNode.innerHTML;
	_par = _par.replace(/textarea/gim,"textarea");
	_par = _par.replace("<textarea ","\n<textarea ");
	_par = _par.replace("\n\n","\n");
	_par = _par.replace("\t","");

	var _ret = "";
	var _split = _par.split("\n");
	for(var i =0;i<_split.length; i++){
		var _tar = _split[i];
		if(_tar.indexOf(_g.id)!=-1){

			var re = /autocomplete=[\'\"]on[\'\"]/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'autocomplete="off" burglish="true" ');
			}else{_tar = _tar.replace("<textarea ", '<textarea burglish="true" autocomplete="off" ');}
			
			var rex = eval('/(id=[\"\']'+_g.id+'[\"\'])/');
			
			re=/\=([^'" <>]+)\ /gim;
			_tar = _tar.replace(re,'\="$1" ');
			
			re = /(onkeydown=[\'\"](?!_onKDown_))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,' $1return _onKDown_(event, this); ');
			}else{_tar = _tar.replace(rex, '$1 onkeydown="return _onKDown_(event, this);"  ');}

			re = /(onkeyup=[\'\"](?!_onKUp_))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 _onKUp_(event, this); ');
			}else{_tar = _tar.replace(rex, '$1 onkeyup="_onKUp_(event, this);"  ');}

			if(isIE){
				re = /(onkeypress=[\'\"](?!_onKPress_))/i;
				if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 _onKPress_(event, this); ');
				}else{_tar = _tar.replace(rex, '$1 onkeypress="_onKPress_(event, this);"  ');}
			}
			
			re = /(onmouseup=[\'\"](?!_onKUp_))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 _onKUp_(event, this); ');
			}else{_tar = _tar.replace(rex, '$1 onmouseup="_onKUp_(event, this);"  ');}
			
			re = /(onmouseover=[\'\"](?!_onMOver_))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 _onMOver_(this); ');
			}else{_tar = _tar.replace(rex, '$1 onmouseover="_onMOver_(this);"  ');}

			re = /(onblur=[\'\"](?!onBlur))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 onBlur(event, this); ');
			}else{_tar = _tar.replace(rex, '$1 onblur="onBlur(event, this);"  ');}

			re = /(onfocus=[\'\"](?!onFocus))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 onFocus(event, this); ');
			}else{_tar = _tar.replace(rex, '$1 onfocus="onFocus(event, this);"  ');}
			
			re = /(style=[\'\"](?!font))/i;
			if( re.test(_tar) ) {_tar = _tar.replace(re,'$1 font-family:Zawgyi-One,Arial,Verdana,Sans-Serif; ');
			}else{_tar = _tar.replace(rex, '$1 style="font-family:Zawgyi-One,Arial,Verdana,Sans-Serif;"  ');}
		}
		_ret += _tar + "\n";
	}
	
	//reset for reuse _tar
	//options tags
	_tar='<span style="display:'+(_o[obj.id]["hideall"]?"none":"")+'">'; 
	
	//checkboxes
	 for(x in _o[obj.id]["options"]){
	 	_tar+='<input id="chk'+obj.id+x+'" '+_o[obj.id]["_css"]+' type="checkbox" onclick="updateOptions(this,\''+obj.id+'\',\''+x+'\',\''+_o[obj.id]["options"][x]["cb"]+'\');">'+_o[obj.id]["options"][x].text+'<\/input>&nbsp;';
	 }
	 
	 //burmese font list
	 _tar+='<select '+_o[obj.id]["_css"]+' name="Choose Font" id="fontTarget" onchange="chgfont(this.value)">';
	 for(var _x in _f){
	 	if(_f[_x].inuse && _f[_x].unicode) _tar+='<option value="'+_x+'">'+_f[_x].fontname+'<\/option>';
	 }
	 _tar +="<\/select>";
	 
	 //for bbcode
	 if(_o[_g.id]["bbcode"]){ 
	    _tar+='&nbsp;<input id="btn'+obj.id+x+'" '+_o[obj.id]["_css"]+' type="button" onclick="addBBFont();" value="Add Font BBCode"><\/input>&nbsp;';
	 }
	 //display version if shversion flag is not false
	 if(_o[_g.id]["shversion"]!=false) _tar+=" Burglish v" + version;
	 
	 //close tag for options
	 _tar+="<\/span>";
	 
	if(_id("boptions")) {
		_id("boptions").innerHTML=_tar;
	}else{
		_ret += "<br>"+_tar;
	}
	
	_tar=''; //reset for reuse
	for(var i=0;i<_chlist.length;i++){
		var _curch=_chlist[i].replace(/[\-\s]+/g,'');
		_tar+='<span onclick="_ic(\''+_curch+'\');">'+_chlist[i]+'<\/span>';
	}
	
	//char list
	if(_id("bchlist")) { 
		_id("bchlist").innerHTML=_tar; //if define write there
	}else{
		_ret += '<br><div id="bchlist" ' + class_bchlist + '>'+_tar+'<div style="clear:both;text-align:right;">This idea is inspired from <a href="http://saturngod.mysteryzillion.com/">SaturnGod<\/a>\'s <a href="http://www.mysteryzillion.com/project/webtext/">Web Text Editor<\/a><\/div>'+'<\/div><br>'; //if not create new
	}
	
	//attach inline menu
	_ret+= '<span ' + class_inline + ' id="'+_g.id+'drop"'+'>'+'</span>';
	
	//write attached html
	_parNode.innerHTML = _ret;
	
	//for IE initialization for menu follow cursor
	if( document.selection ){ 
		obj=_id(_g.id);
		obj.select();
		var range = document.selection.createRange();
		obj._h = range.boundingHeight;
	}
};

//store previous keypress
var tmpkeypress = document.onkeypress?document.onkeypress:function(){};
//if not IE, hook all keypress
if(!isIE) document.onkeypress = _onKPress_;

//for checkbox clicked
function updateOptions(obj,_s,_x,_cb){
	//self.status=[obj.id,obj.checked, _s, _x];
	if(obj.checked){
		for(var i =0;i< _o[_s]["optgrp"].length; i++){
			var _grp=_o[_s]["optgrp"][i];
			if(_grp.indexOf(_x)!=-1){
				for(var x in _o[_s]["options"]){
					if(x!=_x && _grp.indexOf(x)!=-1){
		 				_o[_s][x]=_grp.indexOf(x)==-1;
					}
				}
			}
		}
	}
	_o[_s][_x]=obj.checked;
	updateChkbox(_s);
	if(_o[_s]["_binput"] && _x=="_binput") chgfont(_id("fontTarget").value);
	if(isDef(_cb)) eval(_cb)(_s,_x);
	return false;
}

//update status of checkbox
function updateChkbox(_s){
	for(var x in _o[_s]["options"]){
		_id('chk'+_s+x).checked=_o[_s][x];
	}
	return false;
}

//font change pulldown
function chgfont(_x){
	if(!_o.x) return;
	_o[_o.x]["font"]=_dfont=_x;
	var _g = _id(_o.x);
	_g.focus();
	
	var i=_f[_x]["css"].length-1;
	while(i>=0){
		_g.style.fontFamily = _f[_x]["css"][i]+","+_g.style.fontFamily.replace(_f[_x]["css"][i]+",","");
		i--;
	}
	_g.style.fontSize = _f[_x].fontsize+"pt";
	return false;
}

//add BB font tag for forum editor
function addBBFont(){
    var _g = _id(_o.x);
    //self.status=_o[_o.x]['bbcode'];
    if(_o[_o.x]['bbcode']){
		_Wrap(_g,'[font="'+_f[_dfont].fontname+'"]','[/font]');
	}
	return false;
}

//char list generator
function sh_chlist(_s,_x){
	_activate("bchlist",_id("chk"+_s+_x).checked);
	return false;
}

//insert character
function _ic(_s){
	var _g=_id(_o.x);
	_Wrap(_g,_s);
	_g.focus();
}

// Main Initializing Part for Text Area 
// initTextarea( _g ) 1) initialize variables, 2) attach textbox and 3) create font seleciton toolbar
// initTextarea( _g, skipAttachment, '1' ) initialize variables skipping last two sequence
function initTextarea( _g, skipAttachment ) {
	_o[_g.id] = new Object();
	_o[_g.id]["list"] = new Array();
	_o[_g.id]["curPos"] = -1;
	_o[_g.id]["count"] = 0;
	_o[_g.id]["query"]="";_o[_g.id]["prev"]="";
	_o[_g.id]["prevW"]="";
	_o[_g.id]["noitem"]=0;
	_o[_g.id]["_bmenu"]=true;
	_o[_g.id]["_binput"]=false;
	_o[_g.id]["_suggest"]=false;
	//_o[_g.id]["_cache"]=false;
	_o[_g.id]["_charlist"]=false;
	_o[_g.id]["_screen"]=false;
	_o[_g.id]["_tips"]=true;
	_o[_g.id]["_css"]="";
	_o[_g.id]["options"]={"_bmenu":{text:"Burglish Menu(F2)"},"_tips":{text:"Show Tips"},"_charlist":{text:"Characters List",cb:"sh_chlist"},"_binput":{text:"Burmese Input(F8,Alt-n)"}}; //"_suggest":{text:"Suggest Menu"}
	//"_cache":{text:"Use Cache(Experimental)"}
	_o[_g.id]["optgrp"]=["_bmenu_binput_suggest"];
	//_o[_g.id]["hiddens"]=[""];
	_o[_g.id]["font"]="Zawgyi_One";
	_o[_g.id]["key"]="WinInnwa";
	//_o[_g.id].y = new Object();
	for( var item in _g ) { if(item!="id") _o[_g.id][item] = _g[item]; };
	
	if (!skipAttachment) {
	    
	    if(_id(_g.id)){
		    if(_id(_g.id).tagName=="TEXTAREA" )	attachTextbox( _g );
	    }else{
		    writeTextbox( _g );
	    }
	    updateChkbox(_g.id);
	}
	
	_dfont=_o[_g.id]["font"];
};

// << Code End

// Flag for This js is loaded or not ==

loaded.burglish = true;