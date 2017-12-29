var app = new Vue({
    el: '#car',
    data: {
        proList: [],
        totalMoney: 0
    },
    created() {
        let that = this;
        that.getData();
    },
    filters: {
        formatMoney: function (value) {
            return '￥' + value.toFixed(2);
        }
    },
    methods: {
        getData() {
            let that = this;
            that.$http.get('data/carData.json').then(res => {
                let r = res.data.result;
                res.data.result.list.forEach(item => {
                    item.selected = false;
                    item.num = 1;
                });
                that.proList = r.list;
                that.totalMoney = r.totalMoney;
            })
        },
        select(item) {
            if (item.selected) {
                item.selected = false;
                return;
            }
            if (!item.selected) {
                item.selected = true;
                if (item.num === 0) {
                    item.num = 1;
                }
                return;
            }
            // if (typeof item.selected == 'undefined') {
            //     this.$set(item, "selected", true);
            // } else {
            //     item.selected = !item.selected;
            // }
        },
        addNum(item) {
            if (item.num >= 1) {
                item.num += 1;
            }
        },
        minusNum(item) {
            if (item.num > 1) {
                item.num -= 1;
            }
        }
    }
})