import { App, Plugin } from 'vue'

let key_responders: { [index: string]: [{ is_active: boolean }, (x: any)=>void][] } = {}

export const KeyPlugin: Plugin = {
  install: (app: App, options: any) => {
    let gPs = app.config.globalProperties
    // inject a globally available $translate() method
    gPs.$keyResponderAdd = (responder: any, key: string, f: any) => {
      var rs = key_responders[key];
      if (!rs) {
        rs = []
        key_responders[key] = rs
      }
      rs.push([responder, f])
    }
    gPs.$keyResponderRemove = (responder: any, key: string, f: any) => {
      var rs = key_responders[key];
      if (rs) {
        key_responders[key] = key_responders[key].filter((x) => {
          x[0] != responder || !f || x[1] != f
        })
      }
    }
    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => {
        var rs = key_responders[e.key];
        if (rs) {
          rs.forEach((r) => {
            if (r[0].is_active) {
              r[1](r[0])
            }
          })
        }
        if (e.key != e.code) {
          rs = key_responders[e.code];
          if (rs) {
            rs.forEach((r) => {
              if (r[0].is_active) {
                r[1](r[0])
              }
            })
          }  
        }
      }
    );
  }
}
