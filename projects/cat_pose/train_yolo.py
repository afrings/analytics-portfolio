from ultralytics import YOLO

def main():
    # Load a pre-trained nano pose model (best for edge devices like Raspberry Pi)
    model = YOLO('yolov8n-pose.pt') 

    print("Starting YOLOv8 fine-tuning for Cat Pose Estimation...")
    # Train the model
    results = model.train(
        data='cat_pose.yaml',
        epochs=150,          # Increased epochs because heavy augmentation requires more time to learn
        imgsz=640,           
        batch=16,            
        device='',           
        pose=12.0,           
        
        # --- Heavy Augmentations (Phase 2 Implemented in YOLO Dataloader) ---
        degrees=45.0,        # Rotate images up to 45 degrees
        translate=0.2,       # Translate images horizontally/vertically (cat cut off)
        scale=0.5,           # Scale image 50%
        shear=15.0,          # Shear image by 15 deg
        hsv_h=0.015,         # Hue adjustments (lighting variation)
        hsv_s=0.7,           # Saturation variation
        hsv_v=0.4,           # Brightness variation
        fliplr=0.5,          # 50% chance to flip left-right
        mosaic=1.0,          # 100% chance to combine 4 images into 1 (teaches occlusion)
        mixup=0.2,           # 20% chance to blend images together
        erasing=0.4          # 40% chance to randomly erase parts of the image (simulate hidden paws)
    )
    
    # Export for Raspberry Pi directly if you'd like (e.g. ncnn)
    # print("Exporting to NCNN for Raspberry Pi...")
    # model.export(format='ncnn', imgsz=640)

if __name__ == '__main__':
    main()
