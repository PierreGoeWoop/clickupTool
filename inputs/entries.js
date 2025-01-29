import { Duration } from "../constants/duration.js";
import { ActivityType } from "../constants/activityType.js";
import { TaskIds } from "../constants/taskIds.js";
export const timeEntries = [
  {
    start: new Date("2025-02-02T10:00:00").getTime(),
    duration: Duration.ONE_HOUR,
    tags: [ActivityType.BUILD],
    tid: TaskIds.LABEL_PROJECT,
  },
  {
    start: new Date("2025-02-02T11:00:00").getTime(),
    duration: Duration.TWO_HOURS,
    tags: [ActivityType.BUILD],
    tid: TaskIds.LABEL_PROJECT,
  },
];
