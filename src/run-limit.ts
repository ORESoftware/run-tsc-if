'use strict';

import {EVCb} from "./main";

export type Handler<T> = (val: T, cb: EVCb<any>) => void;

class Exec<T> {
  
  r: Run<T>;
  
  constructor(r: Run<T>) {
    this.r = r;
  }
  
  exec(started: number, err: any, val: any): void {
    
    this.r.incrementedEnded();
    this.r.results[started] = val;
    
    if (err || this.r.getEnded() === this.r.total) {
      return this.r.fireFinalCallback(err);
    }
    
    this.r.run();
    
  }
  
}


class Run<T> {
  
  results: Array<any>;
  list: Array<T>;
  started = 0;
  ended = 0;
  count = 0;
  handler: Handler<T>;
  finalcb: EVCb<any>;
  executor: Exec<T>;
  limit: number;
  total: number;
  
  constructor(items: Iterable<T>, limit: number, h: Handler<T>, cb: EVCb<any>) {
    
    this.finalcb = cb;
    this.limit = limit;
    this.list = Array.from(items);
    this.total = this.list.length;
    this.results = new Array(this.list.length);
    this.executor = new Exec<T>(this);
    this.handler = h;
    
  }
  
  fireFinalCallback(err: any) {
    this.finalcb(err, this.results);
  }
  
  getStarted() {
    return this.started;
  }
  
  incrementedStarted() {
    this.started++;
  }
  
  incrementedEnded() {
    this.ended++;
  }
  
  getEnded() {
    return this.ended;
  }
  
  run(): void {
    
    if(this.list.length < 1){
      return;
    }
    
    const item = this.list.pop();
    
    this.count++;
    const started = this.getStarted();
  
    this.incrementedStarted();
    
    this.handler(item, (err, val) => {
      this.executor.exec(started, err, val);
    });
    
    if (this.count < this.limit) {
      if (this.list.length > 0) {
        this.run();
      }
    }
  }
  
}


export default <T>(items: Iterable<T>, limit: number, handler: Handler<T>, cb: EVCb<any>) => {
  new Run(items, limit, handler, cb).run()
};

