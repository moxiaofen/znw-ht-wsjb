export default{
  getLocation(onGetLocation){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          let latitude = position.coords.latitude;//获取纬度
          let longitude = position.coords.longitude;//获取经度
          console.log("纬度：" + latitude + " 经度：" + longitude);
          var point = new BMap.Point(longitude, latitude);
          var map = new BMap.Map('allmap');
          map.centerAndZoom(point, 12);
          map.enableScrollWheelZoom(true);
          var geoc = new BMap.Geocoder();
          //坐标转换完之后的回调函数
          var translateCallback = function (data) {
            if (data.status === 0) {
              geoc.getLocation(data.points[0], function (rs) {
                //addressComponents对象可以获取到详细的地址信息
                var addComp = rs.addressComponents;
                console.log(addComp);
                var location = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                console.log(location);
                console.log(rs.address);
                onGetLocation(location)
              });
            }
          }
          var convertor = new BMap.Convertor();
          var pointArr = [];
          pointArr.push(point);
          convertor.translate(pointArr, 1, 5, translateCallback)

        });


    } else {
      alert("不支持定位功能");
    }
  },

  getIOSLocationIos(latitude,longitude,onGetLocationIOS){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {

          // let latitudeIos = position.coords.latitude;//获取纬度
          // let longitudeIos = position.coords.longitude;//获取经度
          // console.log("纬度：" + latitudeIos + " 经度：" + longitudeIos);
          // var pointIos = new BMap.Point(longitudeIos, latitudeIos);


          console.log("纬度：" + latitude + " 经度：" + longitude);
          var pointIos = new BMap.Point(longitude, latitude);
          var mapIos = new BMap.Map('allmap');
          mapIos.centerAndZoom(pointIos, 12);
          mapIos.enableScrollWheelZoom(true);
          var geocIos = new BMap.Geocoder();

          //坐标转换完之后的回调函数
          var translateCallbackIos = function (data) {
            if (data.status === 0) {
              geocIos.getLocation(data.points[0], function (rs) {
                //addressComponents对象可以获取到详细的地址信息
                var addCompIos = rs.addressComponents;
                console.log(addCompIos);
                var locationIOS = addCompIos.province + addCompIos.city + addCompIos.district + addCompIos.street + addCompIos.streetNumber;
                onGetLocationIOS(locationIOS);
                return
              });
            }
          }
          var convertorIos = new BMap.Convertor();
          var pointArrIos = [];
          pointArrIos.push(pointIos);
          convertorIos.translate(pointArrIos, 1, 5, translateCallbackIos)

        });


    } else {
      alert("不支持定位功能");
    }
  }

}
