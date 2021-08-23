const recordModel = {

  clone(data:RecordItem|RecordItem[]){
    return JSON.parse(JSON.stringify(data));
  }

};
export {recordModel}