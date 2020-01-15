/* This file is automatically generated from CSSPropertyNames.in by makeprop, do not edit */

#ifndef CSSPropertyNames_h
#define CSSPropertyNames_h

#include <string.h>
#include <wtf/HashFunctions.h>
#include <wtf/HashTraits.h>

namespace WTF {
class AtomicString;
class String;
}

namespace WebCore {

enum CSSPropertyID {
    CSSPropertyInvalid = 0,
#if ENABLE(CSS_VARIABLES)
    CSSPropertyVariable = 1,
#endif
    CSSPropertyColor = 1001,
    CSSPropertyDirection = 1002,
    CSSPropertyDisplay = 1003,
    CSSPropertyFont = 1004,
    CSSPropertyFontFamily = 1005,
    CSSPropertyFontSize = 1006,
    CSSPropertyFontStyle = 1007,
    CSSPropertyFontVariant = 1008,
    CSSPropertyFontWeight = 1009,
    CSSPropertyTextRendering = 1010,
    CSSPropertyWebkitFontFeatureSettings = 1011,
    CSSPropertyWebkitFontKerning = 1012,
    CSSPropertyWebkitFontSmoothing = 1013,
    CSSPropertyWebkitFontVariantLigatures = 1014,
    CSSPropertyWebkitLocale = 1015,
    CSSPropertyWebkitTextOrientation = 1016,
    CSSPropertyWebkitTextSizeAdjust = 1017,
    CSSPropertyWebkitWritingMode = 1018,
    CSSPropertyZoom = 1019,
    CSSPropertyLineHeight = 1020,
    CSSPropertyBackground = 1021,
    CSSPropertyBackgroundAttachment = 1022,
    CSSPropertyBackgroundClip = 1023,
    CSSPropertyBackgroundColor = 1024,
    CSSPropertyBackgroundImage = 1025,
    CSSPropertyBackgroundOrigin = 1026,
    CSSPropertyBackgroundPosition = 1027,
    CSSPropertyBackgroundPositionX = 1028,
    CSSPropertyBackgroundPositionY = 1029,
    CSSPropertyBackgroundRepeat = 1030,
    CSSPropertyBackgroundRepeatX = 1031,
    CSSPropertyBackgroundRepeatY = 1032,
    CSSPropertyBackgroundSize = 1033,
    CSSPropertyBorder = 1034,
    CSSPropertyBorderBottom = 1035,
    CSSPropertyBorderBottomColor = 1036,
    CSSPropertyBorderBottomLeftRadius = 1037,
    CSSPropertyBorderBottomRightRadius = 1038,
    CSSPropertyBorderBottomStyle = 1039,
    CSSPropertyBorderBottomWidth = 1040,
    CSSPropertyBorderCollapse = 1041,
    CSSPropertyBorderColor = 1042,
    CSSPropertyBorderImage = 1043,
    CSSPropertyBorderImageOutset = 1044,
    CSSPropertyBorderImageRepeat = 1045,
    CSSPropertyBorderImageSlice = 1046,
    CSSPropertyBorderImageSource = 1047,
    CSSPropertyBorderImageWidth = 1048,
    CSSPropertyBorderLeft = 1049,
    CSSPropertyBorderLeftColor = 1050,
    CSSPropertyBorderLeftStyle = 1051,
    CSSPropertyBorderLeftWidth = 1052,
    CSSPropertyBorderRadius = 1053,
    CSSPropertyBorderRight = 1054,
    CSSPropertyBorderRightColor = 1055,
    CSSPropertyBorderRightStyle = 1056,
    CSSPropertyBorderRightWidth = 1057,
    CSSPropertyBorderSpacing = 1058,
    CSSPropertyBorderStyle = 1059,
    CSSPropertyBorderTop = 1060,
    CSSPropertyBorderTopColor = 1061,
    CSSPropertyBorderTopLeftRadius = 1062,
    CSSPropertyBorderTopRightRadius = 1063,
    CSSPropertyBorderTopStyle = 1064,
    CSSPropertyBorderTopWidth = 1065,
    CSSPropertyBorderWidth = 1066,
    CSSPropertyBottom = 1067,
    CSSPropertyBoxShadow = 1068,
    CSSPropertyBoxSizing = 1069,
    CSSPropertyCaptionSide = 1070,
    CSSPropertyClear = 1071,
    CSSPropertyClip = 1072,
    CSSPropertyContent = 1073,
    CSSPropertyCounterIncrement = 1074,
    CSSPropertyCounterReset = 1075,
    CSSPropertyCursor = 1076,
    CSSPropertyEmptyCells = 1077,
    CSSPropertyFloat = 1078,
    CSSPropertyFontStretch = 1079,
    CSSPropertyHeight = 1080,
    CSSPropertyImageRendering = 1081,
    CSSPropertyLeft = 1082,
    CSSPropertyLetterSpacing = 1083,
    CSSPropertyListStyle = 1084,
    CSSPropertyListStyleImage = 1085,
    CSSPropertyListStylePosition = 1086,
    CSSPropertyListStyleType = 1087,
    CSSPropertyMargin = 1088,
    CSSPropertyMarginBottom = 1089,
    CSSPropertyMarginLeft = 1090,
    CSSPropertyMarginRight = 1091,
    CSSPropertyMarginTop = 1092,
    CSSPropertyMaxHeight = 1093,
    CSSPropertyMaxWidth = 1094,
    CSSPropertyMinHeight = 1095,
    CSSPropertyMinWidth = 1096,
    CSSPropertyOpacity = 1097,
    CSSPropertyOrphans = 1098,
    CSSPropertyOutline = 1099,
    CSSPropertyOutlineColor = 1100,
    CSSPropertyOutlineOffset = 1101,
    CSSPropertyOutlineStyle = 1102,
    CSSPropertyOutlineWidth = 1103,
    CSSPropertyOverflow = 1104,
    CSSPropertyOverflowX = 1105,
    CSSPropertyOverflowY = 1106,
    CSSPropertyPadding = 1107,
    CSSPropertyPaddingBottom = 1108,
    CSSPropertyPaddingLeft = 1109,
    CSSPropertyPaddingRight = 1110,
    CSSPropertyPaddingTop = 1111,
    CSSPropertyPage = 1112,
    CSSPropertyPageBreakAfter = 1113,
    CSSPropertyPageBreakBefore = 1114,
    CSSPropertyPageBreakInside = 1115,
    CSSPropertyPointerEvents = 1116,
    CSSPropertyPosition = 1117,
    CSSPropertyQuotes = 1118,
    CSSPropertyResize = 1119,
    CSSPropertyRight = 1120,
    CSSPropertySize = 1121,
    CSSPropertySrc = 1122,
    CSSPropertySpeak = 1123,
    CSSPropertyTableLayout = 1124,
    CSSPropertyTabSize = 1125,
    CSSPropertyTextAlign = 1126,
    CSSPropertyTextDecoration = 1127,
    CSSPropertyTextIndent = 1128,
    CSSPropertyTextLineThrough = 1129,
    CSSPropertyTextLineThroughColor = 1130,
    CSSPropertyTextLineThroughMode = 1131,
    CSSPropertyTextLineThroughStyle = 1132,
    CSSPropertyTextLineThroughWidth = 1133,
    CSSPropertyTextOverflow = 1134,
    CSSPropertyTextOverline = 1135,
    CSSPropertyTextOverlineColor = 1136,
    CSSPropertyTextOverlineMode = 1137,
    CSSPropertyTextOverlineStyle = 1138,
    CSSPropertyTextOverlineWidth = 1139,
    CSSPropertyTextShadow = 1140,
    CSSPropertyTextTransform = 1141,
    CSSPropertyTextUnderline = 1142,
    CSSPropertyTextUnderlineColor = 1143,
    CSSPropertyTextUnderlineMode = 1144,
    CSSPropertyTextUnderlineStyle = 1145,
    CSSPropertyTextUnderlineWidth = 1146,
    CSSPropertyTop = 1147,
    CSSPropertyUnicodeBidi = 1148,
    CSSPropertyUnicodeRange = 1149,
    CSSPropertyVerticalAlign = 1150,
    CSSPropertyVisibility = 1151,
    CSSPropertyWhiteSpace = 1152,
    CSSPropertyWidows = 1153,
    CSSPropertyWidth = 1154,
    CSSPropertyWordBreak = 1155,
    CSSPropertyWordSpacing = 1156,
    CSSPropertyWordWrap = 1157,
    CSSPropertyZIndex = 1158,
    CSSPropertyWebkitAnimation = 1159,
    CSSPropertyWebkitAnimationDelay = 1160,
    CSSPropertyWebkitAnimationDirection = 1161,
    CSSPropertyWebkitAnimationDuration = 1162,
    CSSPropertyWebkitAnimationFillMode = 1163,
    CSSPropertyWebkitAnimationIterationCount = 1164,
    CSSPropertyWebkitAnimationName = 1165,
    CSSPropertyWebkitAnimationPlayState = 1166,
    CSSPropertyWebkitAnimationTimingFunction = 1167,
    CSSPropertyWebkitAppearance = 1168,
    CSSPropertyWebkitAspectRatio = 1169,
    CSSPropertyWebkitBackfaceVisibility = 1170,
    CSSPropertyWebkitBackgroundClip = 1171,
    CSSPropertyWebkitBackgroundComposite = 1172,
    CSSPropertyWebkitBackgroundOrigin = 1173,
    CSSPropertyWebkitBackgroundSize = 1174,
    CSSPropertyWebkitBorderAfter = 1175,
    CSSPropertyWebkitBorderAfterColor = 1176,
    CSSPropertyWebkitBorderAfterStyle = 1177,
    CSSPropertyWebkitBorderAfterWidth = 1178,
    CSSPropertyWebkitBorderBefore = 1179,
    CSSPropertyWebkitBorderBeforeColor = 1180,
    CSSPropertyWebkitBorderBeforeStyle = 1181,
    CSSPropertyWebkitBorderBeforeWidth = 1182,
    CSSPropertyWebkitBorderEnd = 1183,
    CSSPropertyWebkitBorderEndColor = 1184,
    CSSPropertyWebkitBorderEndStyle = 1185,
    CSSPropertyWebkitBorderEndWidth = 1186,
    CSSPropertyWebkitBorderFit = 1187,
    CSSPropertyWebkitBorderHorizontalSpacing = 1188,
    CSSPropertyWebkitBorderImage = 1189,
    CSSPropertyWebkitBorderRadius = 1190,
    CSSPropertyWebkitBorderStart = 1191,
    CSSPropertyWebkitBorderStartColor = 1192,
    CSSPropertyWebkitBorderStartStyle = 1193,
    CSSPropertyWebkitBorderStartWidth = 1194,
    CSSPropertyWebkitBorderVerticalSpacing = 1195,
    CSSPropertyWebkitBoxAlign = 1196,
    CSSPropertyWebkitBoxDirection = 1197,
    CSSPropertyWebkitBoxFlex = 1198,
    CSSPropertyWebkitBoxFlexGroup = 1199,
    CSSPropertyWebkitBoxLines = 1200,
    CSSPropertyWebkitBoxOrdinalGroup = 1201,
    CSSPropertyWebkitBoxOrient = 1202,
    CSSPropertyWebkitBoxPack = 1203,
    CSSPropertyWebkitBoxReflect = 1204,
    CSSPropertyWebkitBoxShadow = 1205,
    CSSPropertyWebkitColorCorrection = 1206,
    CSSPropertyWebkitColumnAxis = 1207,
    CSSPropertyWebkitColumnBreakAfter = 1208,
    CSSPropertyWebkitColumnBreakBefore = 1209,
    CSSPropertyWebkitColumnBreakInside = 1210,
    CSSPropertyWebkitColumnCount = 1211,
    CSSPropertyWebkitColumnGap = 1212,
    CSSPropertyWebkitColumnProgression = 1213,
    CSSPropertyWebkitColumnRule = 1214,
    CSSPropertyWebkitColumnRuleColor = 1215,
    CSSPropertyWebkitColumnRuleStyle = 1216,
    CSSPropertyWebkitColumnRuleWidth = 1217,
    CSSPropertyWebkitColumnSpan = 1218,
    CSSPropertyWebkitColumnWidth = 1219,
    CSSPropertyWebkitColumns = 1220,
    CSSPropertyWebkitBoxDecorationBreak = 1221,
    CSSPropertyWebkitFilter = 1222,
    CSSPropertyWebkitAlignContent = 1223,
    CSSPropertyWebkitAlignItems = 1224,
    CSSPropertyWebkitAlignSelf = 1225,
    CSSPropertyWebkitFlex = 1226,
    CSSPropertyWebkitFlexBasis = 1227,
    CSSPropertyWebkitFlexDirection = 1228,
    CSSPropertyWebkitFlexFlow = 1229,
    CSSPropertyWebkitFlexGrow = 1230,
    CSSPropertyWebkitFlexShrink = 1231,
    CSSPropertyWebkitFlexWrap = 1232,
    CSSPropertyWebkitJustifyContent = 1233,
    CSSPropertyWebkitFontSizeDelta = 1234,
    CSSPropertyWebkitGridColumns = 1235,
    CSSPropertyWebkitGridRows = 1236,
    CSSPropertyWebkitGridColumn = 1237,
    CSSPropertyWebkitGridRow = 1238,
    CSSPropertyWebkitHighlight = 1239,
    CSSPropertyWebkitHyphenateCharacter = 1240,
    CSSPropertyWebkitHyphenateLimitAfter = 1241,
    CSSPropertyWebkitHyphenateLimitBefore = 1242,
    CSSPropertyWebkitHyphenateLimitLines = 1243,
    CSSPropertyWebkitHyphens = 1244,
    CSSPropertyWebkitLineBoxContain = 1245,
    CSSPropertyWebkitLineAlign = 1246,
    CSSPropertyWebkitLineBreak = 1247,
    CSSPropertyWebkitLineClamp = 1248,
    CSSPropertyWebkitLineGrid = 1249,
    CSSPropertyWebkitLineSnap = 1250,
    CSSPropertyWebkitLogicalWidth = 1251,
    CSSPropertyWebkitLogicalHeight = 1252,
    CSSPropertyWebkitMarginAfterCollapse = 1253,
    CSSPropertyWebkitMarginBeforeCollapse = 1254,
    CSSPropertyWebkitMarginBottomCollapse = 1255,
    CSSPropertyWebkitMarginTopCollapse = 1256,
    CSSPropertyWebkitMarginCollapse = 1257,
    CSSPropertyWebkitMarginAfter = 1258,
    CSSPropertyWebkitMarginBefore = 1259,
    CSSPropertyWebkitMarginEnd = 1260,
    CSSPropertyWebkitMarginStart = 1261,
    CSSPropertyWebkitMarquee = 1262,
    CSSPropertyWebkitMarqueeDirection = 1263,
    CSSPropertyWebkitMarqueeIncrement = 1264,
    CSSPropertyWebkitMarqueeRepetition = 1265,
    CSSPropertyWebkitMarqueeSpeed = 1266,
    CSSPropertyWebkitMarqueeStyle = 1267,
    CSSPropertyWebkitMask = 1268,
    CSSPropertyWebkitMaskAttachment = 1269,
    CSSPropertyWebkitMaskBoxImage = 1270,
    CSSPropertyWebkitMaskBoxImageOutset = 1271,
    CSSPropertyWebkitMaskBoxImageRepeat = 1272,
    CSSPropertyWebkitMaskBoxImageSlice = 1273,
    CSSPropertyWebkitMaskBoxImageSource = 1274,
    CSSPropertyWebkitMaskBoxImageWidth = 1275,
    CSSPropertyWebkitMaskClip = 1276,
    CSSPropertyWebkitMaskComposite = 1277,
    CSSPropertyWebkitMaskImage = 1278,
    CSSPropertyWebkitMaskOrigin = 1279,
    CSSPropertyWebkitMaskPosition = 1280,
    CSSPropertyWebkitMaskPositionX = 1281,
    CSSPropertyWebkitMaskPositionY = 1282,
    CSSPropertyWebkitMaskRepeat = 1283,
    CSSPropertyWebkitMaskRepeatX = 1284,
    CSSPropertyWebkitMaskRepeatY = 1285,
    CSSPropertyWebkitMaskSize = 1286,
    CSSPropertyWebkitMaxLogicalWidth = 1287,
    CSSPropertyWebkitMaxLogicalHeight = 1288,
    CSSPropertyWebkitMinLogicalWidth = 1289,
    CSSPropertyWebkitMinLogicalHeight = 1290,
    CSSPropertyWebkitNbspMode = 1291,
    CSSPropertyWebkitOrder = 1292,
    CSSPropertyWebkitPaddingAfter = 1293,
    CSSPropertyWebkitPaddingBefore = 1294,
    CSSPropertyWebkitPaddingEnd = 1295,
    CSSPropertyWebkitPaddingStart = 1296,
    CSSPropertyWebkitPerspective = 1297,
    CSSPropertyWebkitPerspectiveOrigin = 1298,
    CSSPropertyWebkitPerspectiveOriginX = 1299,
    CSSPropertyWebkitPerspectiveOriginY = 1300,
    CSSPropertyWebkitPrintColorAdjust = 1301,
    CSSPropertyWebkitRtlOrdering = 1302,
    CSSPropertyWebkitTextCombine = 1303,
    CSSPropertyWebkitTextDecorationsInEffect = 1304,
    CSSPropertyWebkitTextEmphasis = 1305,
    CSSPropertyWebkitTextEmphasisColor = 1306,
    CSSPropertyWebkitTextEmphasisPosition = 1307,
    CSSPropertyWebkitTextEmphasisStyle = 1308,
    CSSPropertyWebkitTextFillColor = 1309,
    CSSPropertyWebkitTextSecurity = 1310,
    CSSPropertyWebkitTextStroke = 1311,
    CSSPropertyWebkitTextStrokeColor = 1312,
    CSSPropertyWebkitTextStrokeWidth = 1313,
    CSSPropertyWebkitTransform = 1314,
    CSSPropertyWebkitTransformOrigin = 1315,
    CSSPropertyWebkitTransformOriginX = 1316,
    CSSPropertyWebkitTransformOriginY = 1317,
    CSSPropertyWebkitTransformOriginZ = 1318,
    CSSPropertyWebkitTransformStyle = 1319,
    CSSPropertyWebkitTransition = 1320,
    CSSPropertyWebkitTransitionDelay = 1321,
    CSSPropertyWebkitTransitionDuration = 1322,
    CSSPropertyWebkitTransitionProperty = 1323,
    CSSPropertyWebkitTransitionTimingFunction = 1324,
    CSSPropertyWebkitUserDrag = 1325,
    CSSPropertyWebkitUserModify = 1326,
    CSSPropertyWebkitUserSelect = 1327,
    CSSPropertyWebkitFlowInto = 1328,
    CSSPropertyWebkitFlowFrom = 1329,
    CSSPropertyWebkitRegionOverflow = 1330,
    CSSPropertyWebkitRegionBreakAfter = 1331,
    CSSPropertyWebkitRegionBreakBefore = 1332,
    CSSPropertyWebkitRegionBreakInside = 1333,
    CSSPropertyWebkitShapeInside = 1334,
    CSSPropertyWebkitShapeOutside = 1335,
    CSSPropertyWebkitWrapMargin = 1336,
    CSSPropertyWebkitWrapPadding = 1337,
    CSSPropertyWebkitWrapFlow = 1338,
    CSSPropertyWebkitWrapThrough = 1339,
    CSSPropertyWebkitWrap = 1340,
    CSSPropertyWebkitDashboardRegion = 1341,
    CSSPropertyWebkitWidgetRegion = 1342,
    CSSPropertyClipPath = 1343,
    CSSPropertyClipRule = 1344,
    CSSPropertyMask = 1345,
    CSSPropertyEnableBackground = 1346,
    CSSPropertyFilter = 1347,
    CSSPropertyFloodColor = 1348,
    CSSPropertyFloodOpacity = 1349,
    CSSPropertyLightingColor = 1350,
    CSSPropertyStopColor = 1351,
    CSSPropertyStopOpacity = 1352,
    CSSPropertyColorInterpolation = 1353,
    CSSPropertyColorInterpolationFilters = 1354,
    CSSPropertyColorProfile = 1355,
    CSSPropertyColorRendering = 1356,
    CSSPropertyFill = 1357,
    CSSPropertyFillOpacity = 1358,
    CSSPropertyFillRule = 1359,
    CSSPropertyMarker = 1360,
    CSSPropertyMarkerEnd = 1361,
    CSSPropertyMarkerMid = 1362,
    CSSPropertyMarkerStart = 1363,
    CSSPropertyShapeRendering = 1364,
    CSSPropertyStroke = 1365,
    CSSPropertyStrokeDasharray = 1366,
    CSSPropertyStrokeDashoffset = 1367,
    CSSPropertyStrokeLinecap = 1368,
    CSSPropertyStrokeLinejoin = 1369,
    CSSPropertyStrokeMiterlimit = 1370,
    CSSPropertyStrokeOpacity = 1371,
    CSSPropertyStrokeWidth = 1372,
    CSSPropertyAlignmentBaseline = 1373,
    CSSPropertyBaselineShift = 1374,
    CSSPropertyDominantBaseline = 1375,
    CSSPropertyGlyphOrientationHorizontal = 1376,
    CSSPropertyGlyphOrientationVertical = 1377,
    CSSPropertyKerning = 1378,
    CSSPropertyTextAnchor = 1379,
    CSSPropertyVectorEffect = 1380,
    CSSPropertyWritingMode = 1381,
    CSSPropertyWebkitSvgShadow = 1382,
};

const int firstCSSProperty = 1001;
const int numCSSProperties = 382;
const int lastCSSProperty = 1382;
const size_t maxCSSPropertyNameLength = 34;

const char* getPropertyName(CSSPropertyID);
const WTF::AtomicString& getPropertyNameAtomicString(CSSPropertyID id);
WTF::String getPropertyNameString(CSSPropertyID id);
WTF::String getJSPropertyName(CSSPropertyID);

inline CSSPropertyID convertToCSSPropertyID(int value)
{
    ASSERT((value >= firstCSSProperty && value <= lastCSSProperty) || value == CSSPropertyInvalid);
    return static_cast<CSSPropertyID>(value);
}

} // namespace WebCore

namespace WTF {
template<> struct DefaultHash<WebCore::CSSPropertyID> { typedef IntHash<unsigned> Hash; };
template<> struct HashTraits<WebCore::CSSPropertyID> : GenericHashTraits<WebCore::CSSPropertyID> {
    static const bool emptyValueIsZero = true;
    static const bool needsDestruction = false;
    static void constructDeletedValue(WebCore::CSSPropertyID& slot) { slot = static_cast<WebCore::CSSPropertyID>(WebCore::lastCSSProperty + 1); }
    static bool isDeletedValue(WebCore::CSSPropertyID value) { return value == (WebCore::lastCSSProperty + 1); }
};
}

#endif // CSSPropertyNames_h

