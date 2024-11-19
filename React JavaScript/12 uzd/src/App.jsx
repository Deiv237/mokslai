import Header from "./components/Header";
import PostImage from "./components/PostImage";
import PostContent from "./components/PostContent";
import Box from "./components/Box";

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Header 
            title="Labas, aš mokausi"
            link="src/components/images/header-cat.jpg"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-sm-6">
          <PostImage 
          link="src/components/images/cat.jpg"
          />
          <PostContent 
          title="Post title"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit voluptates nulla quisquam, dolore alias assumenda porro amet sint iure, excepturi dolorem cupiditate fuga minima illum facere molestias aspernatur recusandae saepe?"
          />
        </div>
        <div className="col-12 col-sm-6">
          <PostImage 
          link="src/components/images/cat.jpg"
          />
          <PostContent 
          title="Post title"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit voluptates nulla quisquam, dolore alias assumenda porro amet sint iure, excepturi dolorem cupiditate fuga minima illum facere molestias aspernatur recusandae saepe?"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 mb-2 col-sm-3">
          <Box class="box bg-primary"/>
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box class="box bg-secondary"/>
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box class="box bg-success"/>
        </div>
        <div className="col-6 mb-2 col-sm-3">
          <Box class="box bg-info"/>
        </div>
      </div>
    </div>
  );
}
