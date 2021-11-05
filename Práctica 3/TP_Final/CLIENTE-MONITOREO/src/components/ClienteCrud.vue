<template>
    <div>
        <div class="col-4">
            <div class="mb-3">
                <label class="form-label">Razón social</label>
                <input v-model="razon_social" class="form-control" type="text" placeholder="Ingrese razón social">
            </div>
            <div class="mb-3">
                <label class="form-label">Teléfono de contacto</label>
                <input v-model="telefono_contacto" class="form-control" type="number" placeholder="Ingrese número de contacto">
            </div>
            <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input v-model="correo_electronico" class="form-control" type="text" placeholder="Ingrese su correo electrónico">
            </div>
        </div>
    </div>

</template>
<script>
export default {
    
}
</script>