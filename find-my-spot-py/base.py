from camera import Camera

cameras = [
  Camera(
    {
      "id": 1,
      "name": "cameraA",
      "videoSrc": "./video/bikePark.mp4",
      "bHeight": 200,
      "bWidth": 110,
      "type": "bike",
      "binary": './binary/CameraAPos'
    }
  ),
  Camera(
    {
      "id": 2,
      "name": "cameraB",
      "videoSrc": "./video/camera2.mp4",
      "bHeight": 160,
      "bWidth": 160,
      "type": "car",
      "binary": './binary/CameraBPos'
    }
  )
]
