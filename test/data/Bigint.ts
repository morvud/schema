import * as S from "@effect/schema/Schema"
import * as Util from "@effect/schema/test/util"

describe.concurrent("Bigint", () => {
  it("clampBigint", async () => {
    const schema = S.bigint.pipe(S.clampBigint(-1n, 1n))

    await Util.expectParseSuccess(schema, 3n, 1n)
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseSuccess(schema, -3n, -1n)
  })

  it("greaterThanBigint", async () => {
    const schema = S.bigint.pipe(S.greaterThanBigint(0n))

    await Util.expectParseFailure(schema, -1n, "Expected a bigint greater than 0n, actual -1n")
    await Util.expectParseFailure(schema, 0n, "Expected a bigint greater than 0n, actual 0n")
    await Util.expectEncodeSuccess(schema, 1n, 1n)
  })

  it("greaterThanOrEqualToBigint", async () => {
    const schema = S.bigint.pipe(S.greaterThanOrEqualToBigint(0n))

    await Util.expectParseFailure(
      schema,
      -1n,
      "Expected a bigint greater than or equal to 0n, actual -1n"
    )
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectEncodeSuccess(schema, 1n, 1n)
  })

  it("lessThanBigint", async () => {
    const schema = S.bigint.pipe(S.lessThanBigint(0n))

    await Util.expectEncodeSuccess(schema, -1n, -1n)
    await Util.expectParseFailure(schema, 0n, "Expected a bigint less than 0n, actual 0n")
    await Util.expectParseFailure(schema, 1n, "Expected a bigint less than 0n, actual 1n")
  })

  it("lessThanOrEqualToBigint", async () => {
    const schema = S.bigint.pipe(S.lessThanOrEqualToBigint(0n))

    await Util.expectEncodeSuccess(schema, -1n, -1n)
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseFailure(
      schema,
      1n,
      "Expected a bigint less than or equal to 0n, actual 1n"
    )
  })

  it("betweenBigint", async () => {
    const schema = S.bigint.pipe(S.betweenBigint(-1n, 1n))

    await Util.expectParseFailure(
      schema,
      -2n,
      "Expected a bigint between -1n and 1n, actual -2n"
    )
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectEncodeSuccess(schema, 1n, 1n)
    await Util.expectParseFailure(schema, 2n, "Expected a bigint between -1n and 1n, actual 2n")
  })

  it("positiveBigint", async () => {
    const schema = S.bigint.pipe(S.positiveBigint())

    await Util.expectParseFailure(schema, -1n, "Expected a positive bigint, actual -1n")
    await Util.expectParseFailure(schema, 0n, "Expected a positive bigint, actual 0n")
    await Util.expectEncodeSuccess(schema, 1n, 1n)
  })

  it("negativeBigint", async () => {
    const schema = S.bigint.pipe(S.negativeBigint())

    await Util.expectEncodeSuccess(schema, -1n, -1n)
    await Util.expectParseFailure(schema, 0n, "Expected a negative bigint, actual 0n")
    await Util.expectParseFailure(schema, 1n, "Expected a negative bigint, actual 1n")
  })

  it("nonNegativeBigint", async () => {
    const schema = S.bigint.pipe(S.nonNegativeBigint())

    await Util.expectEncodeFailure(schema, -1n, "Expected a non-negative bigint, actual -1n")
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseSuccess(schema, 1n, 1n)
  })

  it("nonPositiveBigint", async () => {
    const schema = S.bigint.pipe(S.nonPositiveBigint())

    await Util.expectEncodeSuccess(schema, -1n, -1n)
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseFailure(schema, 1n, "Expected a non-positive bigint, actual 1n")
  })
})
