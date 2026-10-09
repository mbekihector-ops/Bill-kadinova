BILL KADINOVA — TOVUTI NA USAJILI SALAMA

MAFAILI
- index.html: ukurasa wa tovuti na fomu ya usajili/kuingia
- style.css: muonekano unaojipanga kwa simu na kompyuta
- script.js: kadi, lugha, sarafu, muhtasari na QR ya mfano
- auth.js: Firebase Authentication (usajili, kuingia, uthibitishaji wa barua pepe, reset ya nenosiri)
- firebase-config.js: hapa utaweka taarifa za Firebase Web App

MUHIMU: Usajili halisi hauwezi kufanya kazi hadi Firebase iwekwe. Kwa sasa fomu itaonyesha maelekezo badala ya kuhifadhi akaunti. Hakuna nenosiri linalohifadhiwa ndani ya faili za tovuti.

KUWASHA USAJILI HALISI
1. Fungua https://console.firebase.google.com/ na uingie kwa akaunti yako ya Google.
2. Create a project yenye jina Bill KadiNova.
3. Project settings (alama ya gia) > General > Your apps > Add app > Web (</>). Sajili app na nakili firebaseConfig.
4. Fungua firebase-config.js na ubadilishe thamani za mfano kwa apiKey, authDomain, projectId na appId kutoka Firebase. Usichapishe service-account/private keys.
5. Firebase Console > Build > Authentication > Get started > Sign-in method > washa Email/Password.
6. Authentication > Settings > Authorized domains: hakikisha domain ya tovuti yako ya GitHub Pages ipo kwenye orodha.
7. Authentication > Templates: hakiki template ya Email verification.
8. Pakia index.html, style.css, script.js, auth.js na firebase-config.js kwenye ROOT ya repository ya GitHub na Commit changes.
9. Fungua tovuti kupitia HTTPS ya GitHub Pages. Usijaribu auth kwa kufungua index.html kama local file.
10. Sajili akaunti ya majaribio kwa barua pepe unayoweza kuifikia, kisha fungua barua pepe na uthibitishe.

USALAMA
- Firebase Authentication inasimamia nywila; tovuti hii haiziandiki kwenye localStorage au faili.
- Usitume nenosiri kwenye chat wala kuliweka kwenye README.
- Ikiwa baadaye tutahifadhi mialiko ya watumiaji kwenye Firestore, lazima tuweke Security Rules zinazomruhusu kila mtumiaji kuona/kubadilisha data yake tu.
- Usajili, uthibitishaji na kuingia vimeandaliwa; lazima config halisi ya Firebase na mipangilio yake vikamilishwe na kujaribiwa kabla ya kusema vinafanya kazi live.

VIPENGELE VINGINE VILIVYOPO KWENYE UI
Kadi za mfano, fomu ya tukio, preview, flip, QR yenye maelezo ya maandishi, lugha ya Kiswahili/Kiingereza, na bei za mfano USD/TZS. Malipo halisi na hifadhi ya mialiko kwenye akaunti bado havijaunganishwa.
