Práctica Angular: Formulario dinámico con Formly

Desarrollar un formulario dinámico utilizando ngx-formly que permita gestionar la contratación de servicios (Gas o Electricidad), incluyendo lógica condicional y un componente personalizado.

1. Formulario base

El formulario debe incluir los siguientes campos:

- Nombre

- Tipo: texto

- Obligatorio


- Email

- Tipo: email

- Obligatorio

- Validación de formato


- Tipo de servicio

- Campo obligatorio

- Debe implementarse mediante un componente personalizado, no un select corriente (Ver punto 6).

- Opciones:

- Gas

- Electricidad


2. Campos dependientes

El formulario debe mostrar u ocultar campos dinámicamente en función del tipo de servicio seleccionado:

Si el usuario selecciona Electricidad:

- Tipo de tarifa. Opciones:

- Fija

- Variable

- Potencia contratada (numérico, obligatorio).

Si el usuario selecciona Gas:

- Tipo de tarifa. Opciones:

- TUR

- Mercado libre

- Consumo estimado (numérico, obligatorio).


3. Comportamiento dinámico

- Los campos deben:

- Aparecer y desaparecer dinámicamente

- Ser obligatorios únicamente cuando estén visibles


4. Envío del formulario

- Añadir un botón de envío

- Al enviar:

- Validar el formulario

- Mostrar por consola el objeto con los datos introducidos

Ejemplo de estructura esperada:

{

"name": "Juan", "email": "juan@email.com",

"service": "Gas",

"rateGas": "tur",

"consumption": 120

}


5. Requisitos técnicos

- Uso obligatorio de Reactive Forms

- Uso obligatorio de ngx-formly

- El formulario debe definirse mediante configuración ("FormlyFieldConfig[]")

- No se permite crear inputs manualmente en HTML, exceptuando el componente propio.


6. Componente personalizado (obligatorio)

Se debe crear un custom field de Formly para el campo Tipo de servicio:

- Debe permitir seleccionar entre Gas y Electricidad

- Puede implementarse como:

- Botones

- Toggle

- Tarjetas clicables

- Debe integrarse correctamente con el formulario (usar "formControl")


Validaciones

- Nombre obligatorio

- Email obligatorio y con formato válido

- Campos dependientes obligatorios solo cuando estén visibles


Bonus (opcional)

- Limpiar los valores de campos ocultos al cambiar el tipo de servicio

- Personalizar mensajes de error

- Mejorar la interfaz visual
