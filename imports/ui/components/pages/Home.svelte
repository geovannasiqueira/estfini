<script>
  import { Mongo } from "meteor/mongo";
  import { MediaCollection } from "../../../api/MediaCollection";
  console.log(MediaCollection.find({}).fetch());
</script>

{JSON.stringify(MediaCollection.find({}).fetch(), null, 2)}
