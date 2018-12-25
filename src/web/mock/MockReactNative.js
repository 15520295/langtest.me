// MockReactNative.js
import * as react_native from 'react-native-web';
// Replaces DeviceEventEmitter with a timer periodically emitting an incrementing x and y value.
class _DeviceEventEmitter {
    addListener(id, callback) {
        setInterval(() => {
            if (!this.t) {
                this.t = 0;
            }
            this.t += 0.001;

            let rotationRate = {
                x: this.t,
                y: this.t
            };

            callback({
                rotationRate: rotationRate
            });
        }, 100);
    }
}

class _Alert{
    alert(title, message){
        console.log(title);
        console.log(message);
    }
}
export const Alert = new _Alert();
export const DeviceEventEmitter = new _DeviceEventEmitter();
export const Platform = react_native.Platform;
export const Text = react_native.Text;
export const View = react_native.View;
export const findNodeHandle = react_native.findNodeHandle;
export const render = react_native.render;
export const unmountComponentAtNode = react_native.unmountComponentAtNode;
export const processColor = react_native.processColor;
export const NativeModules = react_native.NativeModules;
export const TextPropTypes = react_native.TextPropTypes;
export const ViewPropTypes = react_native.ViewPropTypes;
export const AccessibilityInfo = react_native.AccessibilityInfo;
// export const Alert = react_native.Alert;
export const Animated = react_native.Animated;
export const AppRegistry = react_native.AppRegistry;
export const AppState = react_native.AppState;
export const AsyncStorage = react_native.AsyncStorage;
export const BackHandler = react_native.BackHandler;
export const Clipboard = react_native.Clipboard;
export const DeviceInfo = react_native.DeviceInfo;
export const Dimensions = react_native.Dimensions;
export const Easing = react_native.Easing;
export const InteractionManager = react_native.InteractionManager;
export const Keyboard = react_native.Keyboard;
export const LayoutAnimation = react_native.LayoutAnimation;
export const Linking = react_native.Linking;
export const NativeEventEmitter = react_native.NativeEventEmitter;
export const NetInfo = react_native.NetInfo;
export const PanResponder = react_native.PanResponder;
export const PixelRatio = react_native.PixelRatio;
export const Share = react_native.Share;
export const StyleSheet = react_native.StyleSheet;
export const UIManager = react_native.UIManager;
export const ActivityIndicator = react_native.ActivityIndicator;
export const ART = react_native.ART;
export const Button = react_native.Button;
export const CheckBox = react_native.CheckBox;
export const FlatList = react_native.FlatList;
export const Image = react_native.Image;
export const ImageBackground = react_native.ImageBackground;
export const KeyboardAvoidingView = react_native.KeyboardAvoidingView;
export const ListView = react_native.ListView;
export const Modal = react_native.Modal;
export const Picker = react_native.Picker;
export const ProgressBar = react_native.ProgressBar;
export const SafeAreaView = react_native.SafeAreaView;
export const ScrollView = react_native.ScrollView;
export const SectionList = react_native.SectionList;
export const Slider = react_native.Slider;
export const StatusBar = react_native.StatusBar;
export const SwipeableFlatList = react_native.SwipeableFlatList;
export const SwipeableListView = react_native.SwipeableListView;
export const Switch = react_native.Switch;
export const TextInput = react_native.TextInput;
export const Touchable = react_native.Touchable;
export const TouchableHighlight = react_native.TouchableHighlight;
export const TouchableNativeFeedback = react_native.TouchableNativeFeedback;
export const TouchableOpacity = react_native.TouchableOpacity;
export const TouchableWithoutFeedback = react_native.TouchableWithoutFeedback;
export const VirtualizedList = react_native.VirtualizedList;
export const YellowBox = react_native.YellowBox;
export const ColorPropType = react_native.ColorPropType;
export const EdgeInsetsPropType = react_native.EdgeInsetsPropType;
export const PointPropType = react_native.PointPropType;
export const DatePickerIOS = react_native.DatePickerIOS;
export const DrawerLayoutAndroid = react_native.DrawerLayoutAndroid;
export const ImageEditor = react_native.ImageEditor;
export const ImageStore = react_native.ImageStore;
export const InputAccessoryView = react_native.InputAccessoryView;
export const MaskedViewIOS = react_native.MaskedViewIOS;
export const NavigatorIOS = react_native.NavigatorIOS;
export const PickerIOS = react_native.PickerIOS;
export const ProgressBarAndroid = react_native.ProgressBarAndroid;
export const ProgressViewIOS = react_native.ProgressViewIOS;
export const SegmentedControlIOS = react_native.SegmentedControlIOS;
export const SnapshotViewIOS = react_native.SnapshotViewIOS;
export const TabBarIOS = react_native.TabBarIOS;
export const ToastAndroid = react_native.ToastAndroid;
export const ToolbarAndroid = react_native.ToolbarAndroid;
export const ViewPagerAndroid = react_native.ViewPagerAndroid;
export const WebView = react_native.WebView;
export const ActionSheetIOS = react_native.ActionSheetIOS;
export const AlertIOS = react_native.AlertIOS;
export const CameraRoll = react_native.CameraRoll;
export const DatePickerAndroid = react_native.DatePickerAndroid;
export const ImagePickerIOS = react_native.ImagePickerIOS;
export const PermissionsAndroid = react_native.PermissionsAndroid;
export const Settings = react_native.Settings;
export const StatusBarIOS = react_native.StatusBarIOS;
export const PushNotificationIOS = react_native.PushNotificationIOS;
export const Systrace = react_native.Systrace;
export const TimePickerAndroid = react_native.TimePickerAndroid;
export const TVEventHandler = react_native.TVEventHandler;
export const VibrationIOS = react_native.VibrationIOS;

