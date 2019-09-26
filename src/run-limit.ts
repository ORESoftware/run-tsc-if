'use strict';

import {EVCb} from "./main";

export type Handler<T> = (val: T, v: EVCb<any>) => void;

class Exec<T> {
  
  isDone = false;
  started = -1;
  r: Run<T>;
  
  constructor(r: Run<T>, started: number) {
    this.r = r;
    this.started = started;
  }
  
  done(err?: any, val?: any) {
    
    if (this.isDone) {
      return;
    }
    
    this.isDone = true;
    this.r.incrementedEnded();
    
    if (this.r.shortCircuit) {
      return;
    }
    
    this.r.results[this.started] = val;
    
    if (err || this.r.getEnded() === this.r.total) {
      this.r.shortCircuit = true;
      return this.r.fireFinalCallback(err || null);
    }
    
    if (this.r.list.length > 0) {
      this.r.run();
    }
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
  limit: number;
  total: number;
  shortCircuit = false;
  allDone = false;
  
  constructor(items: Array<T>, limit: number, h: Handler<T>, cb: EVCb<any>) {
    
    this.finalcb = cb;
    this.limit = limit;
    this.list = items;
    this.total = this.list.length;
    this.results = new Array(this.list.length);
    this.handler = h;
    
  }
  
  fireFinalCallback(err: any) {
    
    if (this.allDone) {
      return;
    }
    
    this.allDone = true;
    
    if (typeof this.finalcb !== 'function') {
      return;
    }
    
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
  
  getCurrentCount() {
    return this.started - this.ended;
  }
  
  
  run(): void {
    
    if (this.list.length < 1) {
      return;
    }
    
    const item = this.list.shift();
    const started = this.getStarted();
    
    this.incrementedStarted();
    
    const ex = new Exec(this, started);
    
    this.handler(
      item,
      ex.done.bind(ex)
    );
    
    if (this.list.length < 1) {
      return;
    }
    
    if (this.getCurrentCount() < this.limit) {
      this.run();
    }
  }
  
}


export const mapLimit = <T>(limit: number, items: Iterable<T>, handler: Handler<T>, cb: EVCb<any>) => {
  
  const v = Array.from(items);
  
  if (v.length < 1) {
    cb(null, []);
    return;
  }
  
  new Run(v, limit, handler, cb).run()
  
};


export const map = <T>(items: Iterable<T>, handler: Handler<T>, cb: EVCb<any>) => {
  
  const v = Array.from(items);
  
  if (v.length < 1) {
    cb(null, []);
    return;
  }
  
  new Run(v, Number.MAX_SAFE_INTEGER, handler, cb).run()
  
};


export const mapSeries = <T>(items: Iterable<T>, handler: Handler<T>, cb: EVCb<any>) => {
  
  const v = Array.from(items);
  
  if (v.length < 1) {
    cb(null, []);
    return;
  }
  
  new Run(v, 1, handler, cb).run()
  
};


