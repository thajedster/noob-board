const mongoose = require("mongoose");
const db = require("../models");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/noob-board";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

const postSeed = [
  {
    title: "What are some useful Git commands?",
    body:
      "Nam ac sapien non est vulputate malesuada. Suspendisse hendrerit mauris vel vulputate varius. Pellentesque rhoncus urna ac ex ornare ornare. Ut in sapien nec sem faucibus ullamcorper. Ut egestas mattis lorem, vel vulputate nisl molestie id. Mauris mi mi, tincidunt at massa at, sodales mollis urna. Vivamus posuere augue eu urna maximus viverra. Maecenas vitae odio faucibus, eleifend leo vitae, interdum leo. Mauris at lacinia dui, eget blandit ipsum. Vestibulum in mattis ipsum. Integer ex diam, vulputate sed neque sed, varius congue nibh. Morbi nec vulputate quam. Cras et tristique diam. Cras lacus nisl, ullamcorper lacinia vehicula nec, aliquet vel justo. Ut pretium, velit nec efficitur fermentum, ex dui cursus tellus, quis ullamcorper massa urna id libero."
  },
  {
    title: "I need help with css selectors",
    body:
      "Aenean eu congue mauris, in fermentum dui. In id vehicula felis, et tristique arcu. Suspendisse a porttitor sem. Proin nulla arcu, interdum ac lacus quis, vulputate porta nisi. Cras lobortis ornare vestibulum. Aenean auctor dui enim, ornare tincidunt neque aliquam dictum. In efficitur ante quis massa sollicitudin, eget pulvinar purus tempor. Sed in nibh ut elit fermentum rutrum eget ut arcu. Aliquam erat volutpat. Nulla mattis accumsan ipsum lacinia posuere. Fusce sagittis sit amet ipsum in vestibulum. Aenean vitae molestie magna, vel semper neque. Aliquam eleifend viverra nunc, nec aliquet ex eleifend id. Nulla pulvinar, velit nec maximus ultrices, magna nisi gravida diam, ac volutpat augue nulla et augue."
  },
  {
    title: "How do I use React props?",
    body:
      "Ut vitae pharetra nibh. Proin vitae egestas tortor. Praesent ultricies turpis nec molestie interdum. Duis sed nisi sed erat feugiat placerat quis vel eros. Integer eu dapibus dolor, laoreet rhoncus diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean pellentesque ultricies dapibus."
  }
];

db.Post.deleteMany()
  .then(() => db.Post.collection.insertMany(postSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
