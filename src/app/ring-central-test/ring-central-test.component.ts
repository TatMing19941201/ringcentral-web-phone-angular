import { Component, OnInit } from '@angular/core';

declare const RingCentral: any

@Component({
  selector: 'app-ring-central-test',
  templateUrl: './ring-central-test.component.html',
  styleUrls: ['./ring-central-test.component.scss']
})

export class RingCentralTestComponent implements OnInit {
  clientId = "VOychRDQvtVdWXarcBTdyW"
  clientSecret = "dGsF3OQiwkTdEkF5DHYIm3Zd4PfKcByqVeFpbW2iA2bq"
  rcJWT = 'eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tL3Jlc3RhcGkvb2F1dGgvdG9rZW4iLCJzdWIiOiI4MTc2ODcwMDUiLCJpc3MiOiJodHRwczovL3BsYXRmb3JtLmRldnRlc3QucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozODQxOTI5NjUzLCJpYXQiOjE2OTQ0NDYwMDYsImp0aSI6IjRYdFg4VjFYUzZPNDNrV1VtUmgzY0EifQ.Ah5cUeNDrCUyzH_2bHE9bBgTeHsEz1jERpyOJD1EYajWJ_-bCbtJBouiB74JWQ9J-grTgKPryjMDYR_cm-flMvMHTlMX9TYiUvKz6QGOJJ3g8bpynvhXY0PmNdq4Fhb_IBOIiQJmN6To9GOzFbm-_plXBIOwHKvHS32EpDdws1MYTfnaLefMZ7Bul8JkMOMdx7mL56rPeUMZ5GBVwr9HbaoDHDJtp5qq_aiWZga7547XdWOHx575Kxr5tcKHxUb68R2ouGl3qzzFwoZOkcWEyVLUwAboftwIDsgwhWOL_RHVn8LmBwlnLuyZqrAWJtWZ8uEk0Idowgx4QTMnaxkxTw'
  appName = "Demonstration App"
  appVersion = "0.1.0"
  sdk: any
  webPhone: any;

  constructor() {
  }

  ngOnInit(): void {
    
    const rcsdk = new RingCentral.SDK({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      appName: this.appName,
      appVersion: this.appVersion,
      server: RingCentral.SDK.server.sandbox,
    })
    const remoteVideoElement = document.getElementById("remoteVideo")
    const localVideoElement = document.getElementById("localVideo")

    const platform = rcsdk.platform();

    platform.login({
      jwt: this.rcJWT
    }).then((resp: any) => resp.json()).then((loginResponse: any) => {
      console.log(loginResponse)
      return platform.post(
        '/restapi/v1.0/client-info/sip-provision', 
        { sipInfo: [{transport: 'WSS'}] }
      ).then((res: any) => res.json()).then((data: any)=>{
        console.log(data)
        return RingCentral.WebPhone(data, { 
          clientId: this.clientId,
          appName: this.appName,
          appVersion: this.appVersion,
          uuid: loginResponse.endpoint_id,
          logLevel: 1, // error 0, warn 1, log: 2, debug: 3
          audioHelper: {
            enabled: true, // enables audio feedback when web phone is ringing or making a call
            // incoming: 'path-to-audio/incoming.ogg', // path to audio file for incoming call
            // outgoing: 'path-to-audio/outgoing.ogg', // path to aduotfile for outgoing call            
          },
          media: {
            remote: remoteVideoElement,
            local: localVideoElement
          },
          enableQos: true
        })
      }).then((webPhone: any) => {
        this.webPhone = webPhone
        console.log(webPhone)
      }).catch((err: any) => {
        console.log(err)
      })
    })
  }
}
