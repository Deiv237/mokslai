function sveikas(v1) {
    let v2 = "Jonas";
    [v1, v2] = [v2, v1];
    console.log(v1);
}
sveikas("Petras");