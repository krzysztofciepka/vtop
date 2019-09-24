/**
 * Temperature sensor (RPi only)
 *
 * (c) 2019 Krzysztof Ciepka
 */
"use strict";

const child = require("child_process");

function parseTempOutput(temp) {
  const regex = new RegExp(/[0-9][0-9]\.[0-9]/, "g");

  const matches = regex.exec(temp);

  if (!matches || !matches.length) {
    return "";
  }

  return matches[0];
}

const plugin = {
  /**
   * This appears in the title of the graph
   */
  title: "Temp",
  /**
   * The type of sensor
   * @type {String}
   */
  type: "text",
  /**
   * The default interval time in ms that this plugin should be polled.
   * More costly benchmarks should be polled less frequently.
   */
  interval: 1000,

  initialized: false,

  currentValue: 0,

  /**
   * Grab the current value
   */
  poll() {
    child.exec("vcgencmd measure_temp", (err, stdout, stderr) => {
      plugin.currentValue = parseTempOutput(stdout);
      plugin.initialized = true;
    });
  }
};

module.exports = exports = plugin;
