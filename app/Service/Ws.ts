import { WebSocketServer } from 'ws';

import AdonisServer from '@ioc:Adonis/Core/Server'

class Ws {
  public io: WebSocketServer
  private booted = false

  public boot() {
    /**
     * Ignore multiple calls to the boot method
     */
    if (this.booted) {
      return
    }

    this.booted = true
    this.io = new WebSocketServer({server : AdonisServer.instance!})
  }
}

export default new Ws()