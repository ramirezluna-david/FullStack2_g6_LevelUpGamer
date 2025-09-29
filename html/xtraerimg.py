from rembg import remove
from PIL import Image
import easygui as eg
import os

input_paths = eg.fileopenbox(title='Selecciona las imágenes', multiple=True)

if input_paths:
    output_folder = eg.diropenbox(title='Selecciona la carpeta donde guardar')

    for input_path in input_paths:
        input_image = Image.open(input_path)
        output_image = remove(input_image)

        # Cambiar la extensión a png para soportar transparencia
        filename = os.path.splitext(os.path.basename(input_path))[0] + '.png'
        output_path = os.path.join(output_folder, f'sin_fondo_{filename}')

        output_image.save(output_path)

    print(f"Procesadas {len(input_paths)} imágenes y guardadas en {output_folder}")
else:
    print("No seleccionaste imágenes")
