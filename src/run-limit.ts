'use strict';

import {EVCb} from "./main";

export type Handler<T> = (val: T, cb: EVCb<any>) => void;

class Exec <T>{
  
  r: Run<T>;
  
  constructor(r: Run<T>){
    this.r = r;
  }
  
  run(err: any, val: any): void {
  
    this.r.incrementedEnded();
    this.r.results.push(val);
    
    if(err || this.r.getEnded() === this.r.list.length){
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
  
  constructor(items: Iterable<T>, limit: number, h: Handler<T>, cb: EVCb<any>) {
    
    this.finalcb = cb;
    this.limit = limit;
    this.list = Array.from(items);
    this.results = new Array(this.list.length);
    this.executor = new Exec<T>(this);
    
  }
  
  fireFinalCallback(err: any){
    this.finalcb(err, this.results);
  }
  
  incrementedStarted(){
    this.started++;
  }
  
  incrementedEnded(){
    this.ended++;
  }
  
  getEnded(){
    return this.ended;
  }
  
  run(): void {
  
    const item = this.list.pop();
    
    if(!item){
      return;
    }
    
    this.count++;
    this.incrementedStarted();
    
    this.handler(item, (err,val) => {
      this.executor.run(err,val);
    });
    
    if(this.count < this.limit){
      this.run();
    }
  
  }
  
}


export default <T>(items: Iterable<T>, limit: number, handler: Handler<T>, cb: EVCb<any>) => {
  new Run(items, limit, handler, cb).run()
};

