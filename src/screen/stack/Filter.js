import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {categories} from '../../data/categories';
import {useStore} from '../../store/context';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {dishes} from '../../data/dishes';

const Filter = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [checkCategory, setCheckCategory] = useState(categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [checkboxDifficulty, setCheckboxDifficulty] = useState([
    {
      id: 1,
      difficulty: 'Easy',
      checked: false,
    },
    {
      id: 2,
      difficulty: 'Medium',
      checked: false,
    },
    {
      id: 3,
      difficulty: 'Hard',
      checked: false,
    },
  ]);
  const {setCommonFilter, commonFilter, setFilterIcon} = useStore();
  const [sliderValues, setSliderValues] = useState([35, 60]);

  const handleValuesChange = values => {
    setSliderValues(values);
  };

  const resetFilter = () => {
    setFilterIcon(false);
    setCommonFilter(dishes);
  };

  const saveFilters = () => {
    const filtered = commonFilter.filter(dish => {
      return dish.dfficulty === selectedCategoryId;
    });
    setCommonFilter(filtered);
    setFilterIcon(true);
    navigation.goBack();
  };

  const selectDifficulty = selectedBox => {
    const checked = checkboxDifficulty.map(box => {
      if (box.id === selectedBox.id) {
        return {
          ...box,
          checked: true,
        };
      }
      return {
        ...box,
        checked: false,
      };
    });
    setCheckboxDifficulty(checked);
    setSelectedCategoryId(selectedBox.difficulty);
  };

  const selectCategory = selectedCategory => {
    setCategory(selectedCategory.category);
    const checked = categories.map(cat => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          checked: true,
        };
      }
      return {
        ...cat,
        checked: false,
      };
    });
    setCheckCategory(checked);
    setSelectedCategoryId(selectedCategory.dfficulty);
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              marginRight: '28%',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/icons/backArrow.png')}
            />
            <Text style={styles.headerText}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerText, {fontWeight: '600'}]}>Filters</Text>
        </View>
        <View style={styles.filterWrap}>
          <Image source={require('../../../assets/images/icons/clock.png')} />
          <View style={styles.container}>
            <MultiSlider
              style={styles.slider}
              values={sliderValues}
              sliderLength={320}
              onValuesChange={handleValuesChange}
              min={0}
              max={100}
              step={1}
              allowOverlap={false}
              snapped
              markerStyle={styles.marker}
              pressedMarkerStyle={styles.pressed}
              selectedStyle={styles.selectedTrack}
              unselectedStyle={styles.unselectedTrack}
            />
            <View style={{flexDirection: 'row', gap: 30}}>
              <Text style={styles.sliderText}>{sliderValues[0]} min</Text>
              <Text style={styles.sliderText}>{sliderValues[1]} min</Text>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 16}}>
          <Text style={styles.blockTitleText}>Types of dishes</Text>
        </View>
        <View style={styles.categoriesWrap}>
          {checkCategory.map((category, idx) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => selectCategory(category)}
              key={idx}
              style={[
                styles.categoryContainer,
                category.checked && {backgroundColor: '#fff'},
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  category.checked && {color: '#000'},
                ]}>
                {category.category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{marginHorizontal: 16}}>
          <Text style={styles.blockTitleText}>Recipe difficulty</Text>
        </View>

        <View style={{marginHorizontal: 16, paddingBottom: 180}}>
          {checkboxDifficulty.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                selectDifficulty(item);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: item.checked ? '#FFC20E' : '#fff',
                  borderColor: item.checked ? '#FFC20E' : '#fff',
                  borderWidth: 1,
                  borderRadius: 6,
                  marginRight: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {item.checked ? (
                  <Image
                    source={require('../../../assets/images/icons/checkbox.png')}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#fff',
                }}>
                {item.difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{marginHorizontal: 16, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => saveFilters()}
            activeOpacity={0.7}
            style={styles.mainBtn}>
            <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              resetFilter(), navigation.goBack;
            }}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 25,
  },
  mainBtn: {
    width: '100%',
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FFC20E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  filterWrap: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    gap: 24,
    marginBottom: 20,
  },
  marker: {
    backgroundColor: '#FFC20E',
    width: 24,
    height: 24,
  },
  sliderText: {fontWeight: '400', fontSize: 16, color: '#fff', opacity: 0.5},
  selectedTrack: {
    backgroundColor: '#FFC20E',
  },
  unselectedTrack: {
    backgroundColor: '#fff',
  },
  pressed: {backgroundColor: '#FFC20E', width: 24, height: 24},
  headerText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#fff',
    marginLeft: 8,
  },
  blockTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  categoryText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  categoryContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  footer: {
    width: '100%',
    height: 168,
    backgroundColor: '#1C5839',
    position: 'absolute',
    bottom: 0,
    paddingTop: 12,
  },
  resetBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    marginTop: 20,
  },
  categoriesWrap: {
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
});

export default Filter;
