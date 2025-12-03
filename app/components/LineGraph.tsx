import * as d3 from "d3";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export type LineGraphProps = {
  data: number[];
  color: string;
  label: string;
  stat: string;
};

const GRAPH_ASPECT_RATIO = 9 / 16;

export function LineGraph(props: LineGraphProps) {
  const [width, setWidth] = useState(0);

  const height = width * GRAPH_ASPECT_RATIO;
  const graphHeight = (height * 2) / 3;

  const min = Math.min(...props.data);
  const max = Math.max(...props.data);

  const yScale = d3.scaleLinear().domain([min, max]).range([graphHeight, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([0, props.data.length - 1])
    .range([0, width]);

  const lineFn = d3
    .line<number>()
    .x((d, ix) => xScale(ix))
    .y((d) => yScale(d));

  const svgLine = lineFn(props.data);

  return (
    <View
      style={styles.container}
      onLayout={(ev) => setWidth(ev.nativeEvent.layout.width)}
    >
      {/* HEADER */}
      <View style={[styles.header, { height: height - graphHeight }]}>
        <View style={styles.headerContent}>
          <Text numberOfLines={1} style={styles.label}>
            {props.label}
          </Text>

          <View style={styles.row}>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.stat}>
              {props.stat}
            </Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.change}>
              50%
            </Text>
          </View>
        </View>
      </View>

      {/* GRAPH → Only render after width > 0 */}
      {width > 0 && (
        <Svg width={width} height={graphHeight}>
          {svgLine && (
            <Path
              d={svgLine}
              stroke={props.color}
              fill="none"
              strokeWidth={2}
            />
          )}
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    overflow: "hidden",
  },
  header: {
    justifyContent: "flex-end",
  },
  headerContent: {
    padding: 16,
  },
  label: {
    color: "#555",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  stat: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  change: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E53935",
    padding: 4,
  },
});
