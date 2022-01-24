// 移除空属性
export function removePropertyOfNull(origin, excludeKey) {

  const keys = Object.keys(origin);

  const includeKeys = keys.filter(key => key !== excludeKey);

  includeKeys.forEach(includeKey => {
    const nullValue = origin[includeKey] == null;
    const emptyValue = origin[includeKey] === '';

    const isNull =  nullValue || emptyValue;

    if (isNull) {
      delete origin[includeKey];
    }
  });
};

// 树形结构
export function formatDataTree(data) {
  let parent = data.filter(p => p.parentId === null),
      children = data.filter(c => c.parentId !== null);
  
  dataToTree(parent, children);

  return parent;

  function dataToTree(parent, children) {
    parent.map(p => {
      children.map((c, i) => {
        if (c.parentId === p._id) {
          let _children = JSON.parse(JSON.stringify(children));
          _children.splice(i, 1);
          // 找了一个叶子节点后，从这个叶子节点出发继续寻找这个叶子节点下的子节点
          // 直至这一轮找完，开始下一轮遍历
          dataToTree([c], _children);
          if (p.children) {
            p.children.push(c);
          } else {
            p.children = [c];
          }
        }
      });
    });
  }
}

// 交集

// 深拷贝
export function cloneDeep(obj) {
	const d = isArray(obj) ? obj : {};

	if (isObject(obj)) {
		for (const key in obj) {
			if (obj[key]) {
				if (obj[key] && typeof obj[key] === "object") {
					d[key] = cloneDeep(obj[key]);
				} else {
					d[key] = obj[key];
				}
			}
		}
	}

	return d;
}

export function isArray(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

export function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}
