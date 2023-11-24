JAP E-COMMERCE API.
TODOS LOS ENDPOINTS COMIENZAN EN LA RUTA /api Y HAN SIDO PROBADOS EN POSTMAN PARA VERIFICAR SU FUNCIONAMIENTO.

/login:
    metodo: POST
    body: {
        username: NOMBRE DE USUARIO,
        password: CONTRASEÑA
    }
    respuesta: {
        user_id: ID DEL USUARIO,
        auth: TRUE,
        token: TOKEN DEL USUARIO
    }

/cats:
    metodo: GET
    respuesta: [
        {
        "id": ID DE LA CATEGORIA,
        "name": NOMBRE DE LA CATEGORIA,
        "description": DESCRIPCION,
        "productCount": CANTIDAD DE PRODUCTOS,
        "imgSrc": FUENTE DE LA IMAGEN
        }
    ]

/cats_products/(ID DE LA CATEGORIA):
    metodo: GET
    respuesta: {
        "catID": ID CATEGORIA,
        "catName": NOMBRE CATEGORIA,
        "products": [
            {
                "id": ID ARTICULO,
                "name": NOMBRE ARTICULO,
                "description": DESCRIPCION,
                "cost": PRECIO,
                "currency": MONEDA,
                "soldCount": CANTIDAD VENDIDA,
                "image": FUENTE DE LA IMAGEN
            }
        ]
    }

/products/(ID DEL PRODUCTO):
    metodo: GET
    respuesta: {
        "id": ID PRODUCTO,
        "name": NOMBRE PRODUCTO,
        "description": DESCRIPCION,
        "cost": PRECIO,
        "currency": MONEDA,
        "soldCount": CANTIDAD VENDIDA,
        "category": NOMBRE CATEGORIA,
        "images": [
            FUENTES DE IMAGENES
        ],
        "relatedProducts": [
            {
                "id": ID PRODUCTO RELACIONADO,
                "name": NOMBRE PRODUCTO RELACIONADO,
                "image": FUENTE DE IMAGEN
            }
        ]
    }

/products_comments/(ID DEL PRODUCTO)
    metodo: GET
    respuesta: [
        {
            "product": ID DEL PRODUCTO,
            "score": PUNTAJE DEL USUARIO,
            "description": COMENTARIO DEL USUARIO,
            "user": NOMBRE DE USUARIO,
            "dateTime": FECHA Y HORA DEL COMENTARIO
        }
    ]

/user_cart/(ID DEL USUARIO)
    metodo: GET, POST, DELETE
    headers: {
        Content-Type: "application/json",
        access-token: TOKEN DEL USUARIO
    }
    body para POST: {
        {
                "id": ID ARTICULO,
                "name": NOMBRE ARTICULO,
                "count": CANTIDAD,
                "unitCost": COSTO UNITARIO,
                "currency": MONEDA,
                "image": FUENTE DE IMAGEN
        }
    }
    body para DELETE: {
        "id": ID DE ARTICULO A ELIMINAR
    }
    respuesta: {
        "user": ID DEL USUARIO,
        "articles": [
            {
                "id": ID ARTICULO,
                "name": NOMBRE ARTICULO,
                "count": CANTIDAD,
                "unitCost": COSTO UNITARIO,
                "currency": MONEDA,
                "image": FUENTE DE IMAGEN
            }
        ]
    }

/cart/buy
    metodo: GET
    respuesta: {
        "msg": "¡Has comprado con éxito!"
    }

/sell
    metodo: GET
    respuesta: {
        "msg": "¡Has publicado con éxito!"
    }