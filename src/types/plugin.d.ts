// plugin.d.ts
import Vue from 'vue'

let key_responders: { [index: string]: any[] } = {}

function AddKeyResponder (this: any, key: string, f: any) {
  var rs = key_responders[key];
  if (!rs) {
    rs = []
    key_responders[key] = rs
  }
  rs.push([this, f])
}
function RemoveKeyResponder (this: any, key: string, f: any) {
  var rs = key_responders[key];
  if (rs) {
    key_responders[key] = key_responders[key].filter((x) => {
      x[0] != this || !f || x[1] != f
    })
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $add_key_responder: AddKeyResponder,
    $remove_key_responder: RemoveKeyResponder,    
  }
}
