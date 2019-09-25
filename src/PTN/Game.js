import Aggregation from "../aggregation";

import GameBase from "./Game/base";
import GameComments from "./Game/comments";
import GameEnd from "./Game/end";
import GameIX from "./Game/ix";
import GameNavigation from "./Game/navigation";
import GameUndo from "./Game/undo";

export default class Game extends (new Aggregation(
  GameBase,
  GameComments,
  GameEnd,
  GameIX,
  GameNavigation,
  GameUndo
)) {}
