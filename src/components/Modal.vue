<template>
    <div  id="modal-template">
      <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <!-- modal header -->
                    <div class="modal-header">
                          <slot name="header">
                              default header
                          </slot>  
                    </div>

                </div>
            </div>
        </div>
      
      
      </transition>  
    </div>
</template>

<script>
    export default {
        
    }
</script>