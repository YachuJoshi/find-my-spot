import cv2
import pickle
import numpy as np
from utils import checkParkingSpace
from base import cameras
from db import getDbPool

videos = list(map(lambda camera: camera.videoSrc, cameras))
cap = [cv2.VideoCapture(v) for v in videos]
binarys = list(map(lambda camera: camera.binary, cameras))
height = list(map(lambda camera: camera.bHeight, cameras))
width = list(map(lambda camera: camera.bWidth, cameras))
posList = []

for i, binary in enumerate(binarys):
    with open(binary, "rb") as f:
        posList.append(pickle.load(f))

frames = [None] * len(cameras)
rescaledFrames = [None] * len(cameras)
imgGray = [None] * len(cameras)
imgBlur = [None] * len(cameras)
imgThreshold = [None] * len(cameras)
imgMedian = [None] * len(cameras)
imgDilate = [None] * len(cameras)
ret = [None] * len(cameras)
freeSpaceCounter = [None] * len(cameras)

try:
    conn, cursor = getDbPool()
    insertQuery = """UPDATE camera
                    SET available_space = (%s) WHERE id = (%s)"""

    while True:
        for i, c in enumerate(cap):
            if c is not None:
                ret[i], frames[i] = c.read()
                if c.get(cv2.CAP_PROP_POS_FRAMES) == c.get(cv2.CAP_PROP_FRAME_COUNT):
                    c.set(cv2.CAP_PROP_POS_FRAMES, 0)

        for i, frame in enumerate(frames):
            if ret[i] == True:
                rescaledFrames[i] = cv2.resize(frame, (1152, 648))

                imgGray[i] = cv2.cvtColor(rescaledFrames[i], cv2.COLOR_BGR2GRAY)
                imgBlur[i] = cv2.GaussianBlur(imgGray[i], (3, 3), 1)
                imgThreshold[i] = cv2.adaptiveThreshold(
                    imgBlur[i],
                    255,
                    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                    cv2.THRESH_BINARY_INV,
                    25,
                    16,
                )
                imgMedian[i] = cv2.medianBlur(imgThreshold[i], 5)
                kernel = np.ones((3, 3), np.uint8)
                imgDilate[i] = cv2.dilate(imgMedian[i], kernel, iterations=1)

                freeSpaceCounter[i] = checkParkingSpace(
                    rescaledFrames[i], imgDilate[i], posList[i], height[i], width[i]
                )
                cv2.imshow(f"{cameras[i].name}", rescaledFrames[i])

                cursor.execute(insertQuery, (freeSpaceCounter[i], cameras[i].id))
                conn.commit()

        if cv2.waitKey(5) & 0xFF == ord("q"):
            break

except:
    print("Something went wrong!")

finally:
    if conn:
        cursor.close()
        conn.close()

for c in cap:
    if c != None:
        c.release()

cv2.destroyAllWindows()
