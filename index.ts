import { of } from 'rxjs';
import { concatMap, switchMap, delay, mergeMap } from 'rxjs/operators';

console.log(`------------------- concatMap ---------------------`)

//emit delay value
const source = of(1000, 500, 2000, 800);
// map value from source into inner observable, when complete emit result and move to next
const example = source.pipe(
  concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);
//output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
const subscribe = example.subscribe(val =>
  console.log(`With concatMap: ${val}`)
);

console.log(`------------------- mergeMap ---------------------`)
// showing the difference between concatMap and mergeMap
const mergeMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(10000),
    mergeMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe(val => console.log(`With mergeMap: ${val}`));


console.log(`------------------- switchMap ---------------------`)
// showing the difference between concatMap and mergeMap
const switchMapExample = source
  .pipe(
    // just so we can log this after the first example has run
    delay(15000),
    switchMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
  )
  .subscribe(val => console.log(`With switchMap: ${val}`));

setTimeout(() => {
  subscribe.unsubscribe();
  mergeMapExample.unsubscribe();
  switchMapExample.unsubscribe();
}, 25000)
