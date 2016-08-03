<div id="mdqmapEditor" class="row">
    <ui-gmap-google-map center="map.center" zoom="map.zoom" draggable="true" class="main ng-isolate-scope angular-google-map" options="map.options" events="map.events">
        <ui-gmap-markers models="itemToEdit.markersResult" coords="'self'" icon="'icon'" events="itemToEdit.markersResult.events" options="itemToEdit.markersResult.options"
          doRebuildAll="true" idKey="'idKey'">
        </ui-gmap-markers>
    </ui-gmap-google-map>
</div>
