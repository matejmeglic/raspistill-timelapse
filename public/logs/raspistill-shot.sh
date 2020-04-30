#!/bin/bash
#   -sh 40 -awb auto -mm average -v -n
# raspistill -w 3280 -h 2464 -o  /home/pi/camera/raspistill_%d.jpg -awb auto -sh 100 -q 100 -v -co 50 -br 60 -sa -10 -a 12
# raspistill -w 3280 -h 2464 -o  /home/pi/camera/raspistill_shot/$DATE.jpg -sh 100 -q 100 -v -vf -awb off -awbg 1.6,1.5

DATE=$(date +"%Y-%m-%d_%H%M%S")

raspistill -w 3280 -h 2464 -o  /home/pi/camera/raspistill_shot/$DATE.jpg -sh 100 -q 100 -v -hf -vf -ev -4 -awb off -awbg 1.6,1.7 -mm average

