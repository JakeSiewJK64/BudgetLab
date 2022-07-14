/**
 * Time Created: 5:42:22 PM
 * Date Created: Jul 14, 2022
 * Author: JakeSiewJK64
 */

package com.jakesiewjk64.budgetlab.dao;

import java.util.Collection;
import java.util.Optional;

public interface IDao<T> {
	Optional<T> get(long id);

	Collection<T> getAll();

	int save(T t);

	void update(T t);

	void delete(T t);
}
