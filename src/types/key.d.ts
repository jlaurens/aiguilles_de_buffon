export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $keyResponderAdd: (responder: { is_active: boolean }, key: string, f: (x: any)=>void) => void
    $keyResponderRemove: (responder: any, key: string, f: any) => void
  }
}
