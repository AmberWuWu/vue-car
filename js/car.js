var app = new Vue({
    el: '#car',
    data: {
        all: false, // 全选
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
        selectall() {
            // 全选
            let that = this;
            that.all = true;
            if (that.proList) {
                that.proList.forEach(item => {
                    if (typeof item.selected == 'undefined') {
                        this.$set(item, "selected", true);
                    } else {
                        item.selected = true;
                    }
                })
            }
        },
        cancelall() {
            let that = this;
            that.all = false;
            if (that.proList) {
                that.proList.forEach(item => {
                    if (typeof item.selected == 'undefined') {
                        this.$set(item, "selected", false);
                    } else {
                        item.selected = false;
                    }
                })
            }
        },
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