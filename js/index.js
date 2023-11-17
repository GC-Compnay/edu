
let _data = []

for (let i = 0; i <30000; i++) {
  _data.push([i, Math.random()* 10])
}
const dateList = _data.map(function (item) {
  return item[0];
});
const valueList = _data.map(function (item) {
  return item[1];
});

self.postMessage({ dateList, valueList })
