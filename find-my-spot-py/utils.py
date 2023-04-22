import cv2
import cvzone

def checkParkingSpace(frame, imgPro, posList, height, width):
    spaceCounter = 0
    
    for pos in posList:
        x, y = pos
 
        imgCrop = imgPro[y:y + height, x:x + width]
        count = cv2.countNonZero(imgCrop)
 
        if count < 2500:
            # No Car
            color = (96,213,105)
            thickness = 4
            spaceCounter += 1
        else:
            color = (96,105,213)
            thickness = 4

        # Draw bounding box over car
        cv2.rectangle(frame, pos, (pos[0] + width, pos[1] + height), color, thickness)

        # Pixel
        cvzone.putTextRect(frame, str(count), (x, y), scale=0.5,
                           thickness=2, offset=0, colorR=color, font=cv2.FONT_HERSHEY_SIMPLEX)
 
    cvzone.putTextRect(frame, f'Free: {spaceCounter}/{len(posList)}', (100, 44), scale=1,
                           thickness=3, offset=20, colorR=(76,170,84), font=cv2.FONT_HERSHEY_SIMPLEX,
                           border=cv2.BORDER_REFLECT, colorB=(0,0,0))
    return spaceCounter