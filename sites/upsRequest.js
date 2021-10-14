const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
fetch("https://www.ups.com/track/api/Track/GetStatus?loc=en_US", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-ch-ua":
      '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-xsrf-token":
      "CfDJ8Jcj9GhlwkdBikuRYzfhrpJv-lLNyg-j9-AINTadYPOEu48bmWTFAr4yGn_AVM-xNsR6rgEDP_A16yNVWF6echnLCUOaENoDMtaWjjxvpViq0h_AyBJn2mbs8x_eEWs2HqGCmCcCatL8G10ZRyK4y3I",
    cookie:
      'CONSENTMGR=consent:true%7Cts:1612822862935; gig_bootstrap_3_iCVSE9Ao6y9HITzXCDEN85YkhAnYbAuW1a6LOUnRKPEcwU_QCjFz7q_a1qfN5Vgd=_gigya_ver4; _gig_llp=googleplus; _gig_llu=Anthony; X-CSRF-TOKEN=CfDJ8Jcj9GhlwkdBikuRYzfhrpK-ahTTQXhxdqgWYXlZL5c33Z5KyajBYyDaSwVXWdzUDPPUjFWuOwk87u8fpD17HfUplhvFYSkF6WpJmokIBve2QZjXaGugTmt3TSO25bd6o1HOxVbR0ls58mdg0vKgN2s; at_check=true; AMCVS_036784BD57A8BB277F000101%40AdobeOrg=1; _gcl_au=1.1.316167006.1632777462; _fbp=fb.1.1632777462408.1976551438; s_cc=true; aam_cms=segments%3D9625302%7C22945449; aam_uuid=10740562871994463070835794702146973505; bm_sz=3593511D3451D35493352AE7CF74589A~YAAQTXtBF35GXlV8AQAAI9OegA2+h+Kj/ldkf/EPku/pfKPMnmNus6Ev9+Zb1x/znzPLiXrum+gUVqSLBJGKLYlh/+Yqy/lMlgH/dMf9Tfn19kV0Blb8pqHDW7i+5kHLWHMPLWOuy8UTGapOwraesnY898DUqcTOpfogSBkvRWgVPGyVjOFmQ3GXLmQvPt20YQ/zYYMFDZvdfYo+/DUc9FCj1mwPNymBu+Z4hfTrWDXU8XXjGDM93qSyxocEI1ifYNJKcRRmKI6KpvvfyMuXrB33rY3nwhDLnbHdoxs+Krc=~3422264~3425591; AMCV_036784BD57A8BB277F000101%40AdobeOrg=-1124106680%7CMCIDTS%7C18915%7CMCMID%7C10270341443342450950810160051433932421%7CMCAAMLH-1634850265%7C9%7CMCAAMB-1634850265%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1634252665s%7CNONE%7CMCCIDH%7C-465412732%7CvVersion%7C5.2.0; mboxEdgeCluster=35; ak_bmsc=86EBB6D65779EE50F42ECB4FD012EF24~000000000000000000000000000000~YAAQTXtBF6FGXlV8AQAAHdqegA2ViPsnLGBeRLc0+ympGUB2MHTmFI6tp8ExgEyjy7Rru/vviKf7eXeyrqTJlx4u02b023wsRP/98BHyMWRWOILw+CtNXPbkeg0iA796ksT/Cs/sJXPga3WV6lY+uHynnQECvSZThpx4gIlX3lmJ2MkSXROBvG+Rh0L6JEZr3RzZ7I1nzSQp9uVKSHbf5qiCJYScErDzLJqIwqxx0wa0nqbgq75iROS6J+eNpwdocOAJhYmPnLMqIJ9ntWQugCB9Tf8XHtVMIRmEO/qb68LKUEAQd2iVYd30FsvrW0SCOyAfqvNJouoAxDjA4f2NR4hi8I6YgueNfJ6ld39fYN2pW4CjCmQvVPOIjlbSIS0gIRtu6QRumpZ5sERHRIwhcxjRknbSdaVLFYMuERZP0AoEPcVSFk7gLWin2dtlWg1TopBEsI1yGSLDi7nIGtH+8WTyA2zBkIGs7uF85s0030g8Ma2kVPpu; _abck=ACDFB3BFFAE1C0BC6D83B21CF6D3681D~0~YAAQTXtBF6pGXlV8AQAAh9uegAY0V6v9Jf9r1pmKhq6StjqwN1xLyXFyyslVthl/nrdGACh1XrhrLERCmTd9XkbLNYGdBErTU9XcF9KaBRaFH8ACW5GKpolKXMNslMvxBWGLdoxNIXTMOP4vr5opJE7IPU75c48henYVwzPHdz37wDu8Xl9v4X2H8mhOR55+D8rCik+obSypvk2HwBCDXTO9CYc9u3HyowMAfQ6MZ+bSmTBJpc1T0rtzl1UIIpS6HaVCIx7RoFQkE2c5QUGdEdkD56kUxkTsrWiXiUOXavy7nYpw8omZOO7B5V6lKxT4kucuj/4XqtIlgZPFwZYwXzrup1USUgMFgGkCHxVkSeyGkjwRmLGCNDVhAMlbcJ8tWIA=~-1~-1~-1; s_nr=1634245466826-Repeat; s_vnum=1635750000827%26vn%3D1; s_invisit=true; dayssincevisit=1634245466828; dayssincevisit_s=More%20than%207%20days; PIM-SESSION-ID=gdPx4VnfVEPAKXaj; X-XSRF-TOKEN-ST=CfDJ8Jcj9GhlwkdBikuRYzfhrpJv-lLNyg-j9-AINTadYPOEu48bmWTFAr4yGn_AVM-xNsR6rgEDP_A16yNVWF6echnLCUOaENoDMtaWjjxvpViq0h_AyBJn2mbs8x_eEWs2HqGCmCcCatL8G10ZRyK4y3I; RT="z=1&dm=ups.com&si=146d7d3d-bcb1-4ce1-af13-b5fdbaebb9c6&ss=kurfjyoh&sl=1&tt=2zt&bcn=%2F%2F173e250b.akstat.io%2F&ld=332&ul=b9o&hd=bkl"; mbox=PC#e6190967733b44dca0bc5749b907c0fb.35_0#1697490281|session#46e75d413a62497fa97200902cc47950#1634247325; utag_main=v_id:017783bbdc4d0002a145eda17c8203078003607000b7e$_sn:8$_se:3$_ss:0$_st:1634247280599$vapi_domain:ups.com$ses_id:1634245465485%3Bexp-session$_pn:2%3Bexp-session$_prevpage:ups%3Aus%3Aen%3Atrack%3Bexp-1634249066638$_prevpageid:tracking%2FtrackWeb%2Ftra(3det).html%3Bexp-1634249066639',
  },
  referrer:
    "https://www.ups.com/track?loc=null&tracknum=1Z523F4X0396107827&requester=WT/trackdetails",
  referrerPolicy: "same-origin",
  body: '{"Locale":"en_US","TrackingNumber":["1z523f4x0396107827"],"Requester":"wt/trackdetails","returnToValue":""}',
  method: "POST",
  mode: "cors",
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.trackDetails[0].packageStatus);
  });
