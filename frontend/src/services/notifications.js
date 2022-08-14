export default class Notifications {
  constructor($bus) {
    this.$bus = $bus;
  }

  success(message) {
    this.show(message, "success");
  }

  error(message) {
    this.show(message, "error");
  }

  show(message, level = "success") {
    this.$bus.trigger("notification", { message, level });
  }
}
