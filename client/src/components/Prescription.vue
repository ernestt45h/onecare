<template>
  <div class="container">
      <div class="row">
          <Collapse v-model="panelDeafult" accordion class="col-sm-12 col-md-6 offset-md-3">
                <Panel name="1">
                    Paracetamol 
                    <p slot="content">
                        For your headaches and stuff
                        (2pills, 3X daily)
                        </p>
                </Panel>
                <Panel name="2">
                    Vermox
                    <p slot="content">
                        Too many worms in your body
                        (Take only one and not more)
                    </p>
                </Panel>
                <Panel name="3">
                    乔纳森·伊夫 (There I wrote in chinease)
                    <p slot="content">I just like chinease</p>
                </Panel>
            </Collapse>
      </div>
  </div>
</template>
<script>
export default {
  name: 'prescription',
  data () {
            return {
                panelDeafult: '1'
            }
        }
}
</script>
